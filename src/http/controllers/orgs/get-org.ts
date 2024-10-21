import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeGetOrgUseCase } from '@/use-cases/factories/make-get-org-use-case'

export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
  const getOrgParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getOrgParamsSchema.parse(request.params)

  const getOrgUseCase = makeGetOrgUseCase()

  const { org } = await getOrgUseCase.execute({ id })

  return reply.send({
    org,
  })
}
