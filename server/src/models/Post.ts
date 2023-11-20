import * as mongoose from "mongoose";
import { PostDocument } from "../interfaces/models/PostDocument";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  description: {
    type: String,
  },
  media: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Media",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      // default: [],
    },
  ],
  tags: {type: String, default: ''},
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<PostDocument>("Post", postSchema);
