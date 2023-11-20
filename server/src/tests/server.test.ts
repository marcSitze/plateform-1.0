import app from "../index"
import Post from "../models/Post"
import UserService from "../services/user.service"
import mongoose from "mongoose"
import supertest from "supertest"
import config from '../config'
import mongoConnection from '../config/dbConfig'
import IUser from "../interfaces/users/user.interface"

const userService = new UserService()

beforeEach((done) => {
    mongoConnection(config.mongo.MONGO_TEST_DB)
    done()
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe('Create a user and expect success', () => {
  test("GET /api/users", async () => {
    // const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });
    const user = {
      email: 'tgiraldez0@berkeley.edu',
      username: 'Thalia',
      phone: '110-420-6434',
      password: 'tmUsGoS4'
    }
    const newUser: IUser = await userService.createUser(user)
    await supertest(app).get("/api/users")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data.length).toEqual(1);

        // Check data
        expect(String(response.body.data[0]._id)).toBe(String(newUser._id));
        expect(response.body.data[0].email).toBe(newUser.email);
        expect(response.body.data[0].username).toBe(newUser.username);
        // expect(response.body[0].title).toBe(post.title);
        // expect(response.body[0].content).toBe(post.content);
      });
  });

})


// test("POST /api/posts", async () => {
//   const data = { title: "Post 1", content: "Lorem ipsum" };

//   await supertest(app).post("/api/posts")
//     .send(data)
//     .expect(200)
//     .then(async (response) => {
//       // Check the response
//       expect(response.body._id).toBeTruthy();
//       expect(response.body.title).toBe(data.title);
//       expect(response.body.content).toBe(data.content);

//       // Check data in the database
//       const post = await Post.findOne({ _id: response.body._id });
//       expect(post).toBeTruthy();
//       expect(post.title).toBe(data.title);
//       expect(post.content).toBe(data.content);
//     });
// });

// test("GET /api/posts/:id", async () => {
//   const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

//   await supertest(app).get("/api/posts/" + post.id)
//     .expect(200)
//     .then((response) => {
//       expect(response.body._id).toBe(post.id);
//       expect(response.body.title).toBe(post.title);
//       expect(response.body.content).toBe(post.content);
//     });
// });

// test("PATCH /api/posts/:id", async () => {
//   const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

//   const data = { title: "New title", content: "dolor sit amet" };

//   await supertest(app).patch("/api/posts/" + post.id)
//     .send(data)
//     .expect(200)
//     .then(async (response) => {
//       // Check the response
//       expect(response.body._id).toBe(post.id);
//       expect(response.body.title).toBe(data.title);
//       expect(response.body.content).toBe(data.content);

//       // Check the data in the database
//       const newPost = await Post.findOne({ _id: response.body._id });
//       expect(newPost).toBeTruthy();
//       expect(newPost.title).toBe(data.title);
//       expect(newPost.content).toBe(data.content);
//     });
// });