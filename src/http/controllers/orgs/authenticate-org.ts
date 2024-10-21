import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case'

export async function authenticateOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateOrgBodySchema.parse(request.body)

  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  const { org } = await authenticateOrgUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
      },
    },
  )

  return reply.status(200).send({
    token,
  })
}
