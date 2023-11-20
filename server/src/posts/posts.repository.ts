import makePost from "./post.entity";
import { CreatePostDTO } from "./post.dto";
import { Repository } from "./types/posts.repository.interface";

export default function makePostsRepository({ database }: any): Repository {
  return Object.freeze({
    createPost,
    getPosts,
    findOne,
    getPostById,
    updatePost,
  });

  async function createPost(post: CreatePostDTO) {
    const db = await database;
    const newPost = await db.create(makePost(post));
    return await newPost.save();
  };
  async function getPosts () {
    const db = await database;
    return await db.find({})
      .populate({
        path: "author",
        populate: { path: "user", select: "-password" },
      })
      .populate({ path: "comments", select: '-__v'}).sort({ createdAt: -1})
      // .exec();
  };
  async function findOne(query: Partial<CreatePostDTO>) {
    const db = await database;
    console.log("query: ", query);
    return await db.findOne(query).populate("user", { password: 0, __v: 0 });
  };
  async function getPostById(id: string) {
    const db = await database;
    return await db.findById(id).populate("user").select("-password");
  };

  async function updatePost(id: string, query: any) {
    const db = await database;
    return await db.findOneAndUpdate({ _id: id }, query, { new: true }).populate({
      path: "author",
      populate: { path: "user", select: "-password" },
    })
    .populate({ path: "comments", select: '-__v'})
    // .exec();
  };
}