import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)

    sut = new FetchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets by city', async () => {
    const org1 = await orgsRepository.create(makeOrg())
    const org2 = await orgsRepository.create(makeOrg())

    // Ogr1
    await petsRepository.create(makePet({ orgId: org1.id }))
    await petsRepository.create(makePet({ orgId: org1.id }))
    // Org2
    await petsRepository.create(makePet({ orgId: org2.id }))

    const { pets: pets1 } = await sut.execute({ city: org1.city })
    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets1).toHaveLength(2)
    expect(pets2).toHaveLength(1)
  })

  it('should be able to search for pets by age', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id, age: 5 }))
    await petsRepository.create(makePet({ orgId: org.id, age: 2 }))

    const { pets } = await sut.execute({ city: org.city, age: 2 })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets by size', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id, size: 'small' }))
    await petsRepository.create(makePet({ orgId: org.id, size: 'medium' }))

    const { pets } = await sut.execute({ city: org.city, size: 'medium' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets by energy level', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id, energyLevel: 'low' }))
    await petsRepository.create(makePet({ orgId: org.id, energyLevel: 'high' }))

    const { pets } = await sut.execute({ city: org.city, energyLevel: 'high' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets by independence level', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ orgId: org.id, independenceLevel: 'high' }),
    )
    await petsRepository.create(
      makePet({ orgId: org.id, independenceLevel: 'low' }),
    )

    const { pets } = await sut.execute({
      city: org.city,
      independenceLevel: 'low',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets by environment', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ orgId: org.id, environment: 'outdoor' }),
    )
    await petsRepository.create(
      makePet({ orgId: org.id, environment: 'indoor' }),
    )

    const { pets } = await sut.execute({
      city: org.city,
      environment: 'indoor',
    })

    expect(pets).toHaveLength(1)
  })
})
