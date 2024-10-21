import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { registerPet } from './register-pet'
import { fetchPets } from './fetch-pets'
import { getPet } from './get-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, registerPet)

  app.get('/pets', fetchPets)

  app.get('/pets/:id', getPet)
}
