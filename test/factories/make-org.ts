import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'

interface Overwrite {
  id?: string
  email?: string
  password?: string
}

export function makeOrg(overwrite: Overwrite = {}) {
  return {
    id: randomUUID(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    email: faker.internet.email(),
    ownerName: faker.person.fullName(),
    password: faker.internet.password(),
    state: faker.location.state(),
    streetName: faker.location.street(),
    whatsapp: faker.phone.number(),
    ...overwrite,
  }
}
