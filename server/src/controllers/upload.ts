import { Request, Response, NextFunction } from "express";

export const uploadVideo = async (req: any, res: Response) => {}
export const getSuccessPage = async (req: any, res: Response) => {}
export const getUploadPage = async (req: any, res: Response) => {}
export const newUpload = async (req: any, res: Response) => {}

// import * as path from "path";
// import * as multer from "multer";
// const User = require("../models/Users");
// const Video = require("../models/video");

// // multer config
// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, callback: Function) {
//     callback(null, "./ups");
//   },
//   filename: function (req: any, file: any, callback: Function) {
//     //  console.log(req.user);
//     const ext = file.mimetype.split("/")[1];
//     callback(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     // callback(null, `user-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req: Request, file: any, cb: Function) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Not an image! please upload an image or gif", false);
//   }
// };

// export const getUploadPage = async (req: any, res: Response) => {
//   // console.log(req.user);
//   try {
//     const user = await User.findById(req.user.id);
//     // res.render("videos/video", {
//     //   title: "Upload",
//     //   userAuth: user,
//     // });
//     res.status(200).json({ "msg": "upload an image" });
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const getSuccessPage = async (req: any, res: Response) => {
//   try {
//     const user = await User.findById(req.user.id);
//     // res.render("videos/success", {
//     //   title: "Success",
//     //   userAuth: user,
//     // });
//     res.status(200).json({ "msg": "File uploaded successfully" });
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const uploadVideo = (req: any, res: Response) => {
//   const errors: any = [];
//   //console.log(req.file);
//   // console.log(req.body.video);
//   let video;
//   const upload = multer({
//     storage: storage,
//     fileFilter: multerFilter,
//   }).single("video");
//   console.log(req.body, req.file);
//     upload(req, res, async function (err: any) {
//     if (!req.file) {
//       errors.push({ msg: "please upload an image" });
//       // return res.render("videos/video", {
//       //   title: "Upload",
//       //   errors,
//       //   userAuth: true,
//       // });
//       return res.status(400).json({ "errors": errors });
//     }
//     //   console.log(req.file);
//     if (err) {
//       errors.push({ msg: "please enter a valid image format" });
//       console.log("Error uploading file.");
//       // return res.render("videos/video", {
//       //   title: "Upload",
//       //   errors,
//       //   userAuth: true,
//       // });
//       return res.status(400).json({ "errors": errors });
//     }
//     //res.end("File is uploaded");
//     // res.redirect("/upload/success");
//     // console.log(req.file);
//     console.log("File uploaded successfully");

//     video = new Video({
//       name: req.file.originalname,
//       path: req.file.filename,
//       author: req.user.id,
//       description: req.body.description,
//     });
//     try {
//      const newVideo = await video.save();
//      res.status(201).json({ newVideo });
//     } catch (err) {
//       console.error(err);
//     }
//   });
// };

// export const newUpload = (req: Request, res: Response) => {
//   const upload = multer({ dest: './ups' });
//   upload.single('video');
//   console.log(req.file, req.body);
//   res.send(req.body);
// }