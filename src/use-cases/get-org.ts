import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrgUseCaseRequest {
  id: string
}

interface GetOrgUseCaseResponse {
  org: Omit<Org, 'password'>
}

export class GetOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ id }: GetOrgUseCaseRequest): Promise<GetOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org: {
        id: org.id,
        cep: org.cep,
        city: org.city,
        email: org.email,
        ownerName: org.ownerName,
        state: org.state,
        streetName: org.streetName,
        whatsapp: org.whatsapp,
      },
    }
  }
}
