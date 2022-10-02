const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const pomocni = require('./test_pomocni')

const api = supertest(app)

const Newevent = require('../models/newevent')

const jwt = require("jsonwebtoken")

beforeAll(async () => {
  const verify = jest.spyOn(jwt, "verify")
  verify.mockImplementation(() => () => ({ verified: "false"}))
})

beforeEach( async () => {
  await Newevent.deleteMany({})
  let objectNewevent = new Newevent(pomocni.startingNewevents[0])
  await objectNewevent.save()
  objectNewevent = new Newevent(pomocni.startingNewevents[1])
  await objectNewevent.save()
  objectNewevent = new Newevent(pomocni.startingNewevents[2])
  await objectNewevent.save()
})

test('događaji se vraćaju kao JSON', async () => {
  await api
    .get('/api/newevents')
    .expect(200)
    .expect('Content-Type', /application\/json/)    
})

test('dohvaća sve događaje', async () => {
  const response = await api.get('/api/newevents')

  expect(response.body).toHaveLength(pomocni.startingNewevents.length)
})

test('specificni organizator jednog događaja', async () => {
  const response = await api.get('/api/newevents')

  const organizer = response.body.map(ne => ne.organizer)
  expect(organizer).toContain("DDK GDCK Split, DDK Torcida Brda")
})

test('dodavanje ispravnog događaja bez tokena', async () => {
    const newNewevent = {
      dejt: '2022-09-22T00:00:00.000+00:00',
      organizer: "DDK Kila",
      location: "Plavi neboder",
      address: "Vrboran 41, 21000 Split", 
      time: "00:00-24:00",
      done: false
    }
    await api
    .post('/api/newevents')
    .send(newNewevent)
    .expect(401)
})

test('dohvat specificne poruke', async () => {
    const neweventsStart = await pomocni.neweventsFromBase()
    const wantedNewevent = neweventsStart[0]
  
    const response = await api
    .get(`/api/newevents/${wantedNewevent.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const jsonNewevent = JSON.parse(JSON.stringify(wantedNewevent))
    expect(response.body).toEqual(jsonNewevent)
})

 test('brisanje događaja bez tokena', async () => {
    const neweventsStart = await pomocni.neweventsFromBase()
    const neweventToDelete = neweventsStart[0]
  
    await api.delete(`/api/newevents/${neweventToDelete.id}`).expect(401);
  })

afterAll(() => {
  mongoose.connection.close()
})