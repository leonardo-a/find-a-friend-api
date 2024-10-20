import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { DuplicatedResourceError } from './errors/duplicated-resource-error'
import { hash } from 'bcrypt'

interface RegisterOrgUseCaseRequest {
  email: string
  cep: string
  city: string
  state: string
  ownerName: string
  password: string
  streetName: string
  whatsapp: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    cep,
    city,
    state,
    ownerName,
    password,
    streetName,
    whatsapp,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithEmail) {
      throw new DuplicatedResourceError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      email,
      cep,
      city,
      ownerName,
      password: passwordHash,
      state,
      streetName,
      whatsapp,
    })

    return {
      org,
    }
  }
}
