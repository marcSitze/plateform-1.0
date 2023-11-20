import * as mongoose from 'mongoose';
import { MediaDocument } from '../interfaces/models/MediaDocument'

const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

export default mongoose.model<MediaDocument>('Media', mediaSchema);