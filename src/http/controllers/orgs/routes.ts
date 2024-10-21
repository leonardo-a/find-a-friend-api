import type { FastifyInstance } from 'fastify'

import { authenticateOrg } from './authenticate-org'
import { getOrg } from './get-org'
import { registerOrg } from './register-org'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/login', authenticateOrg)
  app.get('/orgs/:id', getOrg)
}
