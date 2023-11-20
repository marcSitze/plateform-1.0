export type CreateNotifDTO = {
  _id?: string;
  author: string;
  type: string;
  post: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}