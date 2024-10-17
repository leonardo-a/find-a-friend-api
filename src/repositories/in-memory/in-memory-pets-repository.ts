import type { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import type { PetsFilters, PetsRepository } from '../pets-repository'
import type { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((p) => p.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany(params: PetsFilters) {
    const orgsWithCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((p) => orgsWithCity.some((org) => org.id === p.orgId))
      .filter((p) => (params.age ? p.age === params.age : true))
      .filter((p) =>
        params.energyLevel ? p.energyLevel === params.energyLevel : true,
      )
      .filter((p) =>
        params.independenceLevel
          ? p.independenceLevel === params.independenceLevel
          : true,
      )
      .filter((p) =>
        params.environment ? p.environment === params.environment : true,
      )
      .filter((p) => (params.size ? p.size === params.size : true))

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      descriptions: data.descriptions,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      environment: data.environment,
      orgId: data.orgId,
      size: data.size,
    }

    this.items.push(pet)

    return pet
  }
}
