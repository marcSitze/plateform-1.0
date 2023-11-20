import Comment from "../models/Comment";
import { CreateCommentDTO } from "../dto/comment.dto";
import { ICommentsService } from "../interfaces/comments/comments.service.interface";

export default class CommentsService implements ICommentsService {
  constructor() {}
  createComment = async (comment: CreateCommentDTO) => {
    const newComment = new Comment(comment);
    return await newComment.save();
  };
  getComments = async () => {
    return await Comment.find({}).sort({ createdAt: -1 });
  };
  findOne = async (query: Partial<CreateCommentDTO>) => {
    console.log("query: ", query);
    return await Comment.findOne(query).populate("user", {
      password: 0,
      __v: 0,
    });
  };
  getCommentById = async (id: string) => {
    return await Comment.findById(id).populate("user").select("-password");
  };
  // findCommentByQuery: async (query) => {
  //   return await Comment.find(query).populate('user').select('-password');
  // },
  updateComment = async (id: string, query: Partial<CreateCommentDTO>) => {
    return await Comment.findOneAndUpdate({ _id: id }, query);
  };

  getCommentsByQuery = async (query: any) => {
    return await Comment.find(query)
      .populate({ path: "post" })
      .populate({
        path: "author",
        populate: { path: "user", select: "-password" },
      })
      .sort({ createdAt: -1 });
  };
}
