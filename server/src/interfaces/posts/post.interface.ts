export default interface IPost {
    _id: string;
    author: string;
    description: string;
    media: string;
    comments: string[];
    likes?: string[];
    tags?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}