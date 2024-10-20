import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { makeOrg } from 'test/factories/make-org'
import { DuplicatedResourceError } from './errors/duplicated-resource-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()

    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute(makeOrg())

    expect(org.id).toEqual(expect.any(String))
    expect(orgsRepository.items).toHaveLength(1)
  })

  it('should not be able to register an org with an email already in use', async () => {
    const org = makeOrg()

    await sut.execute(org)

    await expect(sut.execute(org)).rejects.toBeInstanceOf(
      DuplicatedResourceError,
    )
  })
})
