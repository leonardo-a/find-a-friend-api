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

  it('should be able to fetch pets by city', async () => {
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

  it('should be able to fetch pets by city and age', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: 3 }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: 1 }))

    const response = await request(app.server).get('/pets').query({
      city: org.city,
      age: 1,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to fetch pets by city and size', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'small' }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'medium' }))

    const response = await request(app.server).get('/pets').query({
      city: org.city,
      size: 'medium',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to fetch pets by city and environment', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ environment: 'outdoor' }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ environment: 'indoor' }))

    const response = await request(app.server).get('/pets').query({
      city: org.city,
      environment: 'indoor',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to fetch pets by city and energy level', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energyLevel: 'low' }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energyLevel: 'high' }))

    const response = await request(app.server).get('/pets').query({
      city: org.city,
      energyLevel: 'high',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to fetch pets by city and independence level', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ independenceLevel: 'low' }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ independenceLevel: 'medium' }))

    const response = await request(app.server).get('/pets').query({
      city: org.city,
      independenceLevel: 'medium',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to fetch pets with all filters', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/login').send({
      email: org.email,
      password: org.password,
    })

    const pet1 = makePet({
      age: 5,
      energyLevel: 'low',
      independenceLevel: 'high',
      environment: 'indoor',
      size: 'small',
    })

    const pet2 = makePet({
      age: 1,
      energyLevel: 'high',
      independenceLevel: 'medium',
      environment: 'outdoor',
      size: 'medium',
    })

    const pet3 = makePet({
      age: 2,
      energyLevel: 'medium',
      independenceLevel: 'low',
      environment: 'outdoor',
      size: 'large',
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet1)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet2)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet3)

    let response = await request(app.server).get('/pets').query({
      city: org.city,
      age: 1,
      energyLevel: 'high',
      independenceLevel: 'medium',
      environment: 'outdoor',
      size: 'medium',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/pets').query({
      city: org.city,
      environment: 'outdoor',
    })

    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to fetch pets without city', async () => {
    const response = await request(app.server).get('/pets').query({})
    expect(response.statusCode).toEqual(400)
  })
})
