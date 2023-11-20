import { Document } from 'mongoose';

export interface TagDocument extends Document {
  author: string;
  tag: string;
  variants: string[];
  count: number;
  createdAt?: Date;
  updatedAt?: Date;
}