import request from 'supertest'
import { app } from '@/app'
import { makeOrg } from 'test/factories/make-org'

describe('Register Org Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an org', async () => {
    const org = makeOrg()

    const response = await request(app.server).post('/orgs').send(org)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      orgId: expect.any(String),
    })
  })
})
