import { Document } from 'mongoose';

export interface CommentDocument extends Document {
    _id: string;
    author:  string,
    message: string,
    post: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}
