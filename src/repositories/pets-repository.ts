import type { Pet, Prisma } from '@prisma/client'

export interface PetsFilters {
  city: string
  age?: number
  size?: string
  energyLevel?: string
  independenceLevel?: string
  environment?: string
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findMany(params: PetsFilters): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
