import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string
  environment?: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energyLevel,
    environment,
    independenceLevel,
    size,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany({
      city,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
    })

    return {
      pets,
    }
  }
}
