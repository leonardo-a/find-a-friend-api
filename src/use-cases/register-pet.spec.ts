import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)

    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create(makeOrg())

    const { pet } = await sut.execute(
      makePet({
        orgId: org.id,
      }),
    )

    expect(pet.id).toEqual(expect.any(String))
    expect(petsRepository.items).toHaveLength(1)
  })

  it('should not be able to register a pet with nonexistent org', async () => {
    await expect(sut.execute(makePet())).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
