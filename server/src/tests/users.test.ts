import supertest from "supertest";
import mongoose from 'mongoose'
import app from '../index'
import config from '../config'
import UserService from "../services/user.service";
import mongoConnection from "../config/dbConfig";
import IUser from "../interfaces/users/user.interface";

const userService = new UserService()

beforeEach((done) => {
  mongoConnection(config.mongo.MONGO_TEST_DB)
  done()
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe('User Service methods', () => {
  const user = {
    email: 'tgiraldez0@berkeley.edu',
    username: 'Thalia',
    phone: '110-420-6434',
    password: 'tmUsGoS4'
  }
  it('Should create a new user', async () => {
    await supertest(app).post('/api/users')
      .send(user)
      .expect(201)
      .then(async (response) => {
        // Check response
        // console.log('Response: ', response.body)
        expect(response.body.success).toBeTruthy()
        expect(response.body.data.msg).toContain('User created successfully')

      })
  });

  it('Should get a new created user', async () => {
    const newUser: IUser = await userService.createUser(user)
      await supertest(app).get('/api/users')
      .then(async (response) => {
        // console.log('responseGET: ', response.body)
        expect(response.body.data[0]._id).toBeTruthy();
        expect(response.body.data[0].email).toBe(user.email)
        expect(response.body.data[0].username).toBe(user.username)
        expect(response.body.data[0].phone).toBe(user.phone)
      })
  })

  it('Should get the list of users', async () => {
    await supertest(app).get('/api/users')
      .then(async response => {
        expect(Array.isArray(response.body.data)).toBeTruthy()
      })
  })
})