const bcrypt = require('bcrypt')
const User = require('../models/user')
const pomocni = require('./test_pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})
  const passHash = await bcrypt.hash('tajna', 10)
  const user = new User({name: 'Admin', username: 'admin', passHash})
  await user.save()
})

test("Korisnici u JSON formatu", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test('stvaranje novog korisnika', async () =>{
  const startingUsers = await pomocni.usersInBase()

  const newUser = {
    username: 'dfranic',
    name: 'Domagoj Franić',
    pass: 'dfranic98'
  }

  await api
  .post('/api/users')
  .send(newUser)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const usersEnd = await pomocni.usersInBase()
  expect(usersEnd).toHaveLength(startingUsers.length + 1)

  const usersNames = usersEnd.map(u => u.username)
  expect(usersNames).toContain(newUser.username)
})
  

test('ispravno vraca pogresku ako vec postoji username', async () =>{
  const startingUsers = await pomocni.usersInBase()

  const newUser = {
    username: 'admin',
    ime: 'Domagoj Franić',
    pass: 'oarwa'
  }

  const result = await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` to be unique')

  const usersEnd = await pomocni.usersInBase()
  expect(usersEnd).toHaveLength(startingUsers.length)
})  

afterAll(() => {
    mongoose.connection.close()
})