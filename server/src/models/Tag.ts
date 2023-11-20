import mongoose from 'mongoose'
import { TagDocument } from "../interfaces/models/TagDocument";

const TagSchema = new mongoose.Schema({
  tag: {
    type: String,
  },
  variants: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  count: {
    type: Number,
    default: 1
  }
}, { timestamps: true })

export default mongoose.model<TagDocument>("Tag", TagSchema);
