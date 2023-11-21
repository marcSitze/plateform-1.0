import express, { Router } from "express";
const router: Router = express.Router();

// routes
import accountsRoute from "../modules/profile/profile.routes";
import usersRoute from "../modules/user/users.routes";
import postsRoutes from "../modules/post/posts.routes";
import commentsRoutes from "../modules/comment/comments.routes";
import mediaRoutes from "../modules/media/media.routes";
import searchRoutes from "./search";
import tagsRoutes from "../modules/tag/tags.routes";
// import donateRoute from "./donate";

import { isLoggedIn } from "../middlewares/auth/isLoggedIn";
import { getIndex, getIndividual, postComment } from "../controllers";

// Check if user is loggedIn
// router.use(isLoggedIn);

/*===================================
    Index page route get all memes
=====================================*/
// Display all the videos and images
router.get("/", getIndex);
router.get("/refresh", getIndex);
// user routes
router.use("/users", usersRoute);
// account routes
router.use("/accounts", accountsRoute);
// posts routes
router.use("/posts", postsRoutes);
// router.use('/posts', PostsController);
// comments routes
router.use("/comments", commentsRoutes);

// media routes
router.use("/media", mediaRoutes);

router.use("/search", searchRoutes);

router.use("/tags", tagsRoutes);

// router.use("/", reglogRoute);
// app.use("/upload", uploadRoute);
// router.use("/donate", donateRoute);
export default router;
