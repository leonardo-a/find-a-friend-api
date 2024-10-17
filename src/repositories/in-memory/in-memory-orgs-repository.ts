import type { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import type { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((o) => o.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((o) => o.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: randomUUID(),
      cep: data.cep,
      city: data.city,
      email: data.email,
      ownerName: data.ownerName,
      passwordHash: data.passwordHash,
      state: data.state,
      streetName: data.streetName,
      whatsapp: data.whatsapp,
    }

    this.items.push(org)

    return org
  }
}
