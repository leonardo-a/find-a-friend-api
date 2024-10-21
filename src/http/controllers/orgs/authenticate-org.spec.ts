import request from 'supertest'
import { app } from '@/app'
import { makeOrg } from 'test/factories/make-org'

describe('Authenticate Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const response = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
