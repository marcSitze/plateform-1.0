import { Request, Response } from 'express';
import { SuccessHandler, ErrorHandler } from '../common/response.handler';
import CommentService from '../services/comments.service';
import PostsService from '../services/post.service';
import constants from '../common/constants';
import { CreateCommentDTO } from '../dto/comment.dto';

const { httpStatus } = constants;
const commentsService = new CommentService();
const postsService = new PostsService();

export const createComment = async (req: Request, res: Response) => {
  const { author, message, post } : CreateCommentDTO = req.body;
  const errors = [];

  if(!author) {
    errors.push({"msg": "Please enter a user id"});
  }
  if(!message) {
    errors.push({"msg": "Please enter a comment message"});
  }
  if(!post) {
    errors.push({"msg": "Please enter the post id"});
  }

  if(errors.length > 0) {
    return ErrorHandler(res, httpStatus.BAD_REQUEST, errors);
  }

  try {
    const postToUpdate = await postsService.getPostById(post);
    // console.log('postTuUpdate: ', postToUpdate);
    if(!postToUpdate) {
      return ErrorHandler(res, httpStatus.NOT_FOUND, "Post not found...");
    }

    const comment = await commentsService.createComment({
      author,
      message,
      post
    });

    const newpost = await postsService.updatePost(post, { comments: [...postToUpdate.comments, comment._id] });
    // console.log('newpost: ', newpost);
    SuccessHandler(res, httpStatus.CREATED, comment);
    // res.send('ok')
  } catch (err) {
    console.error(err);
  }
}
export const getComment = (req: Request, res: Response) => {}
export const getComments = async (req: Request, res: Response) => {

  try {
    const comments = await commentsService.getComments();
    if(comments.length === 0) {
      return SuccessHandler(res, httpStatus.NO_CONTENT, {"msg": "not comments found..."});
    }

    SuccessHandler(res, httpStatus.OK, comments);
  } catch (err) {
    console.error(err);
  }
}
export const updateComment = (req: Request, res: Response) => {}

export const getCommentsByQuery = async (req: any, res: Response) => {
  try {
    const query = {
      // ...req.query
      post: req.query.post
    }
    console.log('query: ', query);
    if(Object.keys(query).length === 0) {
      return ErrorHandler(res, httpStatus.BAD_REQUEST, { msg: "queries info missing"})
    }
    const comments = await commentsService.getCommentsByQuery(query);
    return SuccessHandler(res, httpStatus.OK, comments)
  } catch (err) {
    console.log('getCommentsByQueryErr: ', err);
  }
}