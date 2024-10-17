import type { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import type { PetsFilters, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findMany(params: PetsFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        energyLevel: params.age,
        independenceLevel: params.independenceLevel,
        environment: params.environment,
        size: params.size,
        org: {
          city: params.city,
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
