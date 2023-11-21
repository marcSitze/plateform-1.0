export type CreateTagDTO = {
  _id?: string;
  author: string;
  tag: string;
  variants?: string[];
  count?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}