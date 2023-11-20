export default interface INotification {
  _id: string;
  author: string;
  type: string;
  message?: string;
  hasViewed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}