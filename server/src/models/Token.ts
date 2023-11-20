
import mongoose from "mongoose";
import { TokenDocument } from "../interfaces/models/TokenDocument";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 600000,
  },
});

export default mongoose.model<TokenDocument>("Token", tokenSchema);