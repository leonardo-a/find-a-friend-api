import request from 'supertest'
import { app } from '@/app'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'

describe('Fetch Pets Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server).get('/pets').query({
      city: org.city,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to fetch pets without city', async () => {
    const response = await request(app.server).get('/pets').query({})
    expect(response.statusCode).toEqual(400)
  })
})
