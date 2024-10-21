import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.coerce.number().int().min(1).max(20).optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independenceLevel: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, age, energyLevel, environment, independenceLevel, size } =
    fetchPetsQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    age,
    energyLevel,
    environment,
    independenceLevel,
    size,
  })

  return reply.send({
    pets,
  })
}
