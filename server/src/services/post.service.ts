import Post from "../models/Post";
import { IPostsService } from "../interfaces/posts/post.service.interface";
import { CreatePostDTO } from "../dto/post.dto";

export default class PostsService implements IPostsService {
  constructor() {}
  createPost = async (post: CreatePostDTO) => {
    const newPost = new Post(post);
    return await newPost.save();
  };
  getPosts = async (query: any) => {
    return await Post.find(query)
      .populate({
        path: "author",
        populate: { path: "user", select: "-password" },
      })
      .populate({ path: "comments", select: '-__v'}).sort({ createdAt: -1})
      .populate({ path: "media", select: 'path photo.contentType'}).sort({ createdAt: -1})
      // .exec();
  };
  findOne = async (query: Partial<CreatePostDTO>) => {
    console.log("query: ", query);
    return await Post.findOne(query).populate("user", { password: 0, __v: 0 });
  };
  getPostById = async (id: string) => {
    return await Post.findById(id).populate("user").select("-password");
  };
  // findPostByQuery: async (query) => {
  //   return await Post.find(query).populate('user').select('-password');
  // },

  updatePost = async (id: string, query: any) => {
    return await Post.findOneAndUpdate({ _id: id }, query, { new: true }).populate({
      path: "author",
      populate: { path: "user", select: "-password" },
    })
    .populate({ path: "comments", select: '-__v'})
    // .exec();
  };
}
