import * as mongoose from 'mongoose';
import { NotificationDocument } from '../interfaces/models/NotificationDocument'

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['LIKE', 'COMMENT', 'POST']
    },
    message: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    hasViewed: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model<NotificationDocument>('Notification', notificationSchema);