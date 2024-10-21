import request from 'supertest'
import { app } from '@/app'
import { makeOrg } from 'test/factories/make-org'

describe('Get Org Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get an org', async () => {
    const { body: org } = await request(app.server)
      .post('/orgs')
      .send(makeOrg())

    const response = await request(app.server).get(`/orgs/${org.orgId}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body?.org).toEqual(
      expect.objectContaining({
        id: org.orgId,
      }),
    )
  })
})
