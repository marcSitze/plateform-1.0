import IPost from './post.interface';
import { CreatePostDTO } from '../../dto/post.dto';

export interface IPostsService{
    createPost(post: CreatePostDTO): Promise<IPost | void>;
    getPosts(query: any): Promise<IPost[] | void>;
    findOne(query: any): Promise<IPost | void | any>;
    getPostById(id: string): Promise<IPost | void | any>;
    updatePost(id: string, query: any): Promise<IPost | void | any>;
}