import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    ownerName: z.string(),
    cep: z.string().min(8),
    city: z.string(),
    state: z.string(),
    streetName: z.string(),
    whatsapp: z.string().min(10),
  })

  const { email, password, ownerName, cep, city, state, streetName, whatsapp } =
    registerOrgBodySchema.parse(request.body)

  const registerOrgUseCase = makeRegisterOrgUseCase()

  const { org } = await registerOrgUseCase.execute({
    cep,
    city,
    email,
    ownerName,
    password,
    state,
    streetName,
    whatsapp,
  })

  return reply.status(201).send({
    orgId: org.id,
  })
}
