import * as mongoose from 'mongoose';
import { AccountDocument } from '../interfaces/models/AccountModel';

const profileSchema = new mongoose.Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
    },
    location: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bio: {
        type: String
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     }],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model<AccountDocument>('Account', profileSchema);