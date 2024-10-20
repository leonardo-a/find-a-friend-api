import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { makeOrg } from 'test/factories/make-org'
import { hash } from 'bcrypt'
import { UnauthorizedError } from './errors/unauthorized-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()

    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const password = '123456ab'
    const passwordHash = await hash(password, 6)

    const org = await orgsRepository.create(makeOrg({ password: passwordHash }))

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password,
    })

    expect(authenticatedOrg.id).toEqual(org.id)
  })

  it('should not be able authenticate nonexistent org', async () => {
    await expect(
      sut.execute({ email: 'johndoe@email.com', password: '123456' }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able authenticate org with wrong password', async () => {
    const password = '123456ab'
    const passwordHash = await hash(password, 6)

    const org = await orgsRepository.create(makeOrg({ password: passwordHash }))

    await expect(
      sut.execute({ email: org.email, password: '123456' }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
