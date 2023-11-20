import IComment from './comments.interface';
import { CreateCommentDTO } from '../../dto/comment.dto';

export interface ICommentsService {
    createComment(comment: CreateCommentDTO): Promise<IComment | void>;
    getComments(): Promise<IComment[] | void>;
    findOne(query: any): Promise<IComment | void | any>;
    getCommentById(id: string): Promise<IComment | void | any>;
}