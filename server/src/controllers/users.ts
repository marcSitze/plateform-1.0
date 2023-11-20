import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

import { SuccessHandler, ErrorHandler } from "../common/response.handler";
import UserService from "../services/user.service";
import AccountService from "../services/account.service";
import { CreateUserDTO } from "../dto/user.dto";
import { EmailService } from "../services/email.service";
import Token from "../models/Token";

import constants from "../common/constants";
import { verifyPassword, generateToken } from "../common/auth";
import config from "../config";

const { httpStatus } = constants;
const userService = new UserService();
const accountService = new AccountService();
const emailService = new EmailService();

export const createUser = async (req: Request, res: Response) => {
  const errors = [];

  const { username, email, phone, password }: CreateUserDTO = req.body;

  let user;

  try {
    // 1 check if user exists
    user = await userService.findOne({ email });

    if (user) {
      errors.push({ msg: "User already exists" });
      return ErrorHandler(res, httpStatus.BAD_REQUEST, errors);
    }
    if (!username) {
      errors.push({ msg: "Please enter the Username" });
    }
    if (!email) {
      errors.push({ msg: "Please enter the email" });
    }
    if (!password) {
      errors.push({ msg: "Please enter your password" });
    }

    if (errors.length > 0) {
      errors.push({ msg: "please fill in all the required informations" });
      return ErrorHandler(res, httpStatus.BAD_REQUEST, errors);
    }

    user = {
      username,
      email,
      phone,
      password,
    };
    // 2 Encrypt password
    const newAccount = await userService.createUser(user);
    await accountService.createAccount({ user: newAccount._id, posts: [] });
    // await emailService.newmailjet({
    //   subject: "Account created",
    //   text: "Account has been created successfully...",
    //   to: "jorelsitze01@gmail.com",
    // });
    console.log("User created");
    SuccessHandler(res, httpStatus.CREATED, {
      msg: "User created successfully...",
    });
  } catch (err) {
    console.error(err);
    ErrorHandler(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      `${err} - Server Error`
    );
  }
};

export const getUsers = async (req: Request, res: Response) => {
  // let searchOptions = {name: ''};
  const query = {}

  console.log('query: ', query)
  if (req.query.search != null && req.query.search !== "") {
    // searchOptions.name = new RegExp(req.query.search, 'i');
  }
  try {
    // const users = await Users.find({});
    //    const users = await Users.find(searchOptions);
    const users = await userService.getUsers(query);
    SuccessHandler(res, httpStatus.OK, users);
  } catch (err) {
    console.error(err);
    ErrorHandler(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      `${err} - Server Error`
    );
  }
};

export const getUserById = async (req: any, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    // let videos = await Videos.find({}).sort({ publishDate: -1 });
    SuccessHandler(res, httpStatus.OK, { user });
  } catch (err) {
    console.error(err);
    ErrorHandler(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      `${err} - Server Error`
    );
  }
};

export const updateUser = () => {};
// get User by query
export const getUser = () => {};

export const login = async (req: Request, res: Response) => {
  type loginDto = {
    email: string;
    password: string;
  };

  const { email, password }: loginDto = req.body;
  console.log("req.body: ", req.body);
  const errors = [];

  if (!email) {
    errors.push({ msg: "Please enter your email" });
  }
  if (!password) {
    errors.push({ msg: "Please enter your password" });
  }

  if (errors.length > 0) {
    return ErrorHandler(res, httpStatus.BAD_REQUEST, errors);
  }

  try {
    let user = await userService.findOne({ email });
    console.log("user: ", user);
    if (!user) {
      errors.push({ msg: "Invalid credidentials" });
      return ErrorHandler(res, httpStatus.BAD_REQUEST, errors);
    }

    const isMatch = await verifyPassword(password, user.password);
    console.log("isMatch: ", isMatch);
    if (!isMatch) {
      errors.push({ msg: "Invalid credidentials" });
      return ErrorHandler(res, httpStatus.BAD_REQUEST, errors);
    }
    const payload = {
      user: {
        id: user._id,
      },
    };

    // sign a user token
    const token = await generateToken(payload);

    console.log("User logged in");
    SuccessHandler(res, httpStatus.OK, {
      msg: "User loggedin successfully...",
      token_type: "Bearer token",
      token,
    });
  } catch (err) {
    console.error(err);
    ErrorHandler(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      `${err} - Server Error`
    );
  }
};

export const requestResetPassword = async (req: Request, res: Response) => {
  console.log('req.body: ', req.body);
  if(!req.body.email) {
    return ErrorHandler(res, httpStatus.BAD_REQUEST, { msg: "Please enter your email"});
  }
  const user = await userService.findOne({ email: req.body.email });
  if (!user) {
    return ErrorHandler(res, httpStatus.BAD_REQUEST, { msg: "Email does not exist"});
  };

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(config.auth.saltRounds));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${config.app.host}/api/users/auth/resetPassword?token=${resetToken}&id=${user._id}`;

  // sendEmail(
  //   user.email,
  //   "Password Reset Request",
  //   {
  //     name: user.name,
  //     link: link,
  //   },
  //   "./template/requestResetPassword.handlebars"
  // );

  await emailService.newmailjet({
    subject: "Password Reset Request",
    text: "Click here to reset your account password please... \n" + link,
    to: user.email,
  });

  // return link;
  // res.send({ link, msg: "check your mail" })
  return SuccessHandler(res, httpStatus.OK, { msg: "Check your mail to reset your password" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { userId, token, password } = req.body;
console.log('req.body: ', req.body);
    if(!userId || !token || !password) {
      return ErrorHandler(res, httpStatus.BAD_REQUEST, { msg: "userId, token, password are missing"});
    }

  try {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
      return ErrorHandler(res, httpStatus.BAD_REQUEST, { msg: "Invalid or expired password reset token"});
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      return ErrorHandler(res, httpStatus.BAD_REQUEST, { msg: "Invalid or expired password reset token"});
    }

    const hash = await bcrypt.hash(password, Number(config.auth.saltRounds));

    // await User.updateOne(
    //   { _id: userId },
    //   { $set: { password: hash } },
    //   { new: true }
    // );

  await userService.updateUser(userId, { password: hash });

    const user = await userService.findOne({ _id: userId });
    if(user){
        // sendEmail(
        //   user.email,
        //   "Password Reset Successfully",
        //   {
        //     name: user.name,
        //   },
        //   "./template/resetPassword.handlebars"
        // );
        await emailService.newmailjet({
          subject: "Password Reset Successfully",
          text: "Account password has been reset successfully... \n",
          to: user.email,
        });

        await passwordResetToken.deleteOne();
    }


    return res.send("Password updated successfully");
  } catch (err) {
    console.error("Error While reseting: ", err);
  }
};
