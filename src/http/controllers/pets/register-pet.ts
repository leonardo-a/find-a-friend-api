import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string().min(2),
    age: z.number().int().min(1).max(20),
    size: z.string(),
    description: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    environment: z.string(),
  })

  const {
    age,
    description,
    energyLevel,
    environment,
    independenceLevel,
    name,
    size,
  } = registerPetBodySchema.parse(request.body)

  const registerPetsUseCase = makeRegisterPetUseCase()

  const { pet } = await registerPetsUseCase.execute({
    age,
    description,
    energyLevel,
    environment,
    independenceLevel,
    name,
    orgId: request.user.sub,
    size,
  })

  return reply.status(201).send({
    petId: pet.id,
  })
}
