import { CreatePostDTO } from "./post.dto";
export default function makePost(postInfo: CreatePostDTO) {
  const { author, description, media } = postInfo;
  return Object.freeze({
    author,
    description,
    media
  });
}