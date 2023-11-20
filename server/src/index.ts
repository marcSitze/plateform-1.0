import express, { RequestHandler, Request } from "express";
import * as path from "path";
import morgan from 'morgan';
import { createServer } from "http";
import { Server } from "socket.io";

import config from "./config";
import { createNotification } from './sockets/notifications'

const app: express.Application = express();

const socketServer = createServer(app)
export const io = new Server(socketServer)
// import routes
import indexRoute from "./routes/index";

// To parse form data
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(morgan("combined") as RequestHandler);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// static folders
// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "../uploads")));

//get timestamp
app.use((req: any, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log('req.ip: ', req.ip)
    console.log(req.headers);

    next()
});

// Entry point routes
app.use("/api", indexRoute);

const users: any = [];

io.on("connection", (socket) => {
  console.log('IO connected...');

  socket.on('connected', (data) => {
    const newUser = {
      socket,
      id: data.id,
      name: data.name
    }
    createNotification(socket);

    users.push(newUser)
    console.log('data: ', data)
    // console.log('users: ', users)
    socket.emit('connected', data)
  })

  socket.on('like', (data) => {
    console.log('liked...')
    console.log('like: ', data)
    // createNotification(data);
    io.emit(data.userId, data)
  })
})

export default socketServer;