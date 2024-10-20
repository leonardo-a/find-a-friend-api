import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { makePet } from 'test/factories/make-pet'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)

    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const pet = await petsRepository.create(makePet())

    const { pet: foundPet } = await sut.execute({
      id: pet.id,
    })

    expect(foundPet).toEqual(pet)
  })

  it('should not be able to found nonexistent pet', async () => {
    await expect(sut.execute({ id: randomUUID() })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
