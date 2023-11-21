import { Request, Response } from "express";

import { SuccessHandler, ErrorHandler } from "../common/response.handler";
import UserService from "../modules/user/user.service";
import AccountService from "../modules/profile/account.service";
import PostsService from "../modules/post/post.service";
import { CreateUserDTO } from "../modules/user/user.dto";

import constants from "../common/constants";

const { httpStatus } = constants;
const userService = new UserService();
const accountService = new AccountService();
const postsService = new PostsService();

export const searchByQuery = async (req: any, res: Response) => {
  console.log("req.query: ", req.query);

  const users = await userService.findUsersByQuery({
    username: new RegExp(req.query.term, "gi"),
  });
  const posts = await postsService.getPosts({
    description: new RegExp(req.query.term, "gi"),
  });
  SuccessHandler(res, httpStatus.OK, { users, posts });
};
