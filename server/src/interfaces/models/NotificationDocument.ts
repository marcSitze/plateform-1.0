import { Document } from 'mongoose';

export interface NotificationDocument extends Document{
    _id: string,
    type: string,
    message?: string,
    entityId: string,
    hasViewed: boolean,
    author: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}