import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  id?: string
  orgId?: string
  age?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string
  environment?: string
}

export function makePet(overwrite: Overwrite = {}) {
  return {
    id: crypto.randomUUID(),
    orgId: crypto.randomUUID(),
    name: faker.animal.dog(),
    description: faker.lorem.paragraph(),
    age: faker.number.int().toString(),
    size: faker.helpers.arrayElement(['small', 'medium', 'large']),
    energyLevel: faker.helpers.arrayElement(['low', 'medium', 'high']),
    independenceLevel: faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment: faker.helpers.arrayElement(['indoor', 'outdoor']),
    ...overwrite,
  }
}
