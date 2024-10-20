import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgUseCase } from './get-org'
import { makeOrg } from 'test/factories/make-org'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgUseCase

describe('Get Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()

    sut = new GetOrgUseCase(orgsRepository)
  })

  it('should be able to get an org', async () => {
    const org = await orgsRepository.create(makeOrg())

    const { org: foundOrg } = await sut.execute({ id: org.id })

    expect(foundOrg.email).toEqual(org.email)
  })

  it('should not be able to get a nonexistent org', async () => {
    await expect(sut.execute({ id: randomUUID() })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
