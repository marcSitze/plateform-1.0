import { Request, Response } from "express";

import { SuccessHandler, ErrorHandler } from "../common/response.handler";
import UserService from "../services/user.service";
import AccountService from "../services/account.service";
import PostsService from "../services/post.service";
import { CreateUserDTO } from "../dto/user.dto";

import constants from "../common/constants";

const { httpStatus } = constants;
const userService = new UserService();
const accountService = new AccountService();
const postsService = new PostsService();

export const searchByQuery = async (req: any, res: Response) => {
  console.log('req.query: ', req.query)

  const users = await userService.findUsersByQuery({ username: new RegExp(req.query.term,"gi") })
  const posts = await postsService.getPosts({description: new RegExp(req.query.term,"gi") });
  SuccessHandler(res, httpStatus.OK, { users, posts })
}