import IPost from '../interfaces/posts/post.interface';
interface IBio {
    youtube: string;
    twitter: string;
    facebook: string;
    instagram: string;
}
export type AccountDTO = {
    _id?: string;
    user: string;
    posts: string[];
    location?: string;
    followers?: string[];
    bio?: IBio;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}