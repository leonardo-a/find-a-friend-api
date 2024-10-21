import type { Pet } from '@prisma/client'

import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  orgId: string
  age: number
  name: string
  size: string
  description: string
  energyLevel: string
  independenceLevel: string
  environment: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    orgId,
    age,
    name,
    size,
    description,
    energyLevel,
    environment,
    independenceLevel,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      orgId,
      age,
      description,
      energyLevel,
      environment,
      independenceLevel,
      name,
      size,
    })

    return {
      pet,
    }
  }
}
