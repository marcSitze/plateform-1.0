export default interface IComment {
    _id?: string;
    author: string;
    message: string;
    post: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}