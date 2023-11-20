// import mongodb from 'mongodb'
import mongoose from "mongoose";
import Todo from "../models/Todo";
import Post from "../models/Post";

export default async function makeDb(model: string) {
  let db: any;
  switch (String(model)) {
    case "Todo":
      console.log("modelMakeDb: ", model);
      db = Todo;
      break;
    case "Post":
      console.log("PostModel: ", model);
      db = Post;
      break;
    default:
      console.log("DefaultMakeDb: ", model);
      db = null;
  }

  return db;
}
