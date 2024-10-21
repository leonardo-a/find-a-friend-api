import request from 'supertest'
import { app } from '@/app'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'

describe('Get Pet Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const org = makeOrg()

    const { body: orgResponse } = await request(app.server)
      .post('/orgs')
      .send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    const pet = makePet({ orgId: orgResponse.orgId })

    const petResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet)

    const response = await request(app.server).get(
      `/pets/${petResponse.body.petId}`,
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: pet.name,
      }),
    )
  })
})
