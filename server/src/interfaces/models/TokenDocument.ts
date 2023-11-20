import { Document } from 'mongoose';

export interface TokenDocument extends Document {
  userId: string;
  token: string;
  createdAt: Date;
}