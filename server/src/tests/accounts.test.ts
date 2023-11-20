import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../index'
import mongoConnection from '../config/dbConfig'
import config from '../config'

beforeEach((done) => {
  mongoConnection(config.mongo.MONGO_TEST_DB)
  done()
})

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

describe('Accounts Operations')