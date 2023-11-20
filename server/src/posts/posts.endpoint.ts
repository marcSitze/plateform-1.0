import constants from "../common/constants";
import response from "../common/response";
const { httpStatus } = constants;
export default function makePostsEndpointHandler({
  postsRepository,
  accountsService,
}: any) {
  return async function handle(httpRequest: any) {
    switch (httpRequest.method) {
      case "POST":
        return createPostService(httpRequest);
      case "GET":
        return getPosts();
    }
  };

  async function createPostService(httpRequest: any) {
    const { author, description, media } = httpRequest.body;
    const errors = [];

    if (!author) {
      errors.push({ msg: "please fill in the author id" });
    }
    // if(!description) {
    // 	errors.push({msg: "please fill in a description"});
    // }
    if (!media) {
      errors.push({ msg: "please attach a media link" });
    }

    if (errors.length > 0) {
      errors.push({ msg: "please enter the required information" });
      return response(false, httpStatus.BAD_REQUEST, errors);
    }

    let post = {
      author,
      description: description ?? "",
      media,
    };

    try {
      const account = await accountsService.getAccountById(author);
      if (!account) {
        return response(false, httpStatus.NOT_FOUND, {
          msg: "User Account not found...",
        });
      }
      const newPost = await postsRepository.createPost(post);

      const accountUp = await accountsService.updateAccount(
        { _id: author },
        { posts: [...account.posts, newPost._id] }
      );
      console.log("AccountUP: ", accountUp);
      response(true, httpStatus.CREATED, post);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPosts() {
    try {
      const posts = await postsRepository.getPosts();
      if (!posts) {
        return response(false, httpStatus.NO_CONTENT, "No posts yet...");
      }
      response(true, httpStatus.OK, posts);
    } catch (err) {
      console.error(err);
    }
  }
}
