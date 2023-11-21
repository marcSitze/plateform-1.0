import express, { RequestHandler, Request } from "express";
import * as path from "path";
import morgan from "morgan";
// import swaggerUi from "swagger-ui-express";
// import swaggerJsDoc from "swagger-jsdoc";

import config from "./config";

const app: express.Application = express();
// import routes
import indexRoute from "./routes/index";

// To parse form data
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(morgan("combined") as RequestHandler);

// Set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// const swaggerOptions = {
//   definition: {
//     openapi: "1.0.0",
//     info: {
//       title: "PLATEFORM API",
//       version: "1.0.0",
//       description: "PLATEFORM API",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// static folders
// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "../uploads")));

//get timestamp
app.use((req: any, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("req.ip: ", req.ip);
  console.log(req.headers);

  next();
});

// Entry point routes
app.use("/api", indexRoute);

export default app;
