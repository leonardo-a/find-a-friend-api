import type { Org } from '@prisma/client'
import { compare } from 'bcrypt'

import type { OrgsRepository } from '@/repositories/orgs-repository'
import { UnauthorizedError } from './errors/unauthorized-error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new UnauthorizedError()
    }

    const doesPasswordMatchWithHash = await compare(password, org.password)

    if (!doesPasswordMatchWithHash) {
      throw new UnauthorizedError()
    }

    return {
      org,
    }
  }
}
