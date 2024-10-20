import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)

    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = makeOrg()

    orgsRepository.items.push({
      passwordHash: org.password,
      ...org,
    })

    const { pet } = await sut.execute(
      makePet({
        orgId: org.id,
      }),
    )

    expect(pet.id).toEqual(expect.any(String))
    expect(petsRepository.items).toHaveLength(1)
  })

  it('should not be able to create a pet with nonexistent org', async () => {
    await expect(sut.execute(makePet())).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
