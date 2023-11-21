import { Document } from 'mongoose';

export interface UserDocument extends Document{
    _id: string;
    username: string,
    email: string,
    password: string,
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}