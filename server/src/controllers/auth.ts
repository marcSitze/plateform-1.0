import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
const newSecret = "secret";
const User = require("../models/Users");
import * as bcrypt from "bcrypt";

import { Errors } from "../types";
import UserService from "../services/user.service";

// export const getRegisterForm = () => {
//        // to check if user is loggedin
//    const userAuth = null;
//    res.render('register/register', {
//       user: new User(),
//       title: 'Register',
//       userAuth
//    });
// }

export const createUser = async (req: Request, res: Response) => {
  const errors = [];

  const { name, email, password } = req.body;
   console.log(req.body);
  let user;
  try {
    // to check if user is loggedin
    const userAuth = null;
    // 1 check if user exists
    user = await User.findOne({ email });

    if (user) {
      errors.push({ msg: "User already exists" });
      // return res.status(400).render('register/register', {
      //    user: new User(),
      //    errors,
      //    title: 'Register',
      //    userAuth
      // });
      return res.status(400).json({ "errors": errors });
    }
    if (!name) {
      errors.push({ msg: "Please enter the Username" });
    }
    if (!email) {
      errors.push({ msg: "Please enter the email" });
    }
    if (!password) {
      errors.push({ msg: "Please enter your password" });
    }

    user = new User({
      name,
      email,
      password,
    });

    if (!name || !email || !password) {
      //   return res.render('register/register', {
      //      user,
      //      errors,
      //      title: 'Register',
      //      userAuth
      //    });
      return res.status(400).json({ 'errors': errors });
    }

    // 2 Encrypt password
    // Hash user password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    // return user registered successfully
    const newUser = await user.save();

    // 3 return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    // jwt.sign(
    //    payload,
    //    newSecret,
    //    {
    //       expiresIn: 3600000
    //    },
    //    (err: any, token: string | undefined) => {
    //       if(err) throw err;
    //       // res.render('register/login');
    //      // res.json({ token });
    //       res.redirect('/login');
    //    }
    // );

    let token = await jwt.sign(payload, newSecret, {
      expiresIn: 3600000,
    });

    console.log("User created");
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).send("server error");
    console.error(err);
  }
};

export const login = async (req: Request, res: Response) => {
  // to check if user is loggedin
  const userAuth = null;

  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push({ msg: "Please enter your email" });
  }
  if (!password) {
    errors.push({ msg: "Please enter your password" });
  }

  if (!email || !password) {
    //  return res.render('register/login', {
    //  errors,
    //  title: 'Login',
    //  userAuth
    //  });
    return res.status(400).json({ msg: errors });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      errors.push({ msg: "Invalid credidentials" });
      //   return res.status(400).render('register/login', {
      //       errors,
      //       title: 'Login',
      //       userAuth
      //   });
      return res.status(400).json({ msg: errors });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errors.push({ msg: "Invalid credidentials" });
      //       return res.status(400).render('register/login', {
      //       errors,
      //       title: 'Login',
      //       userAuth
      //   });
      return res.status(400).json({ msg: errors });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

   //  jwt.sign(
   //    payload,
   //    newSecret,
   //    {
   //      expiresIn: 3600000,
   //    },
   //    (err: any, token: string | undefined) => {
   //      if (err) throw err;
   //      res.cookie("jwt", token, {
   //        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
   //        httpOnly: true,
   //      });

   //      // res.status(200).json({
   //      //    status: 'success',
   //      //    token,
   //      //    data: {
   //      //       user
   //      //    }
   //      //  });
   //      // res.status(200).redirect('/me');
   //    }
   //  );

    let token = await jwt.sign(payload, newSecret, {
      expiresIn: 3600000,
    });

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    console.log("User logged in");
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
  }
};
