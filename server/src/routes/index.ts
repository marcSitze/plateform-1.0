import express, { Router } from 'express';
const router: Router = express.Router();

// routes
import accountsRoute from "./account";
import usersRoute from "./users";
import postsRoutes from './posts';
import commentsRoutes from './comments'
import mediaRoutes from './media';
import searchRoutes from './search';
import tagsRoutes from './tags';
import notificationsRoutes from './notifications'
// import donateRoute from "./donate";

import { isLoggedIn } from '../middlewares/auth/isLoggedIn';
import { getIndex, getIndividual, postComment } from '../controllers';
import todosController from '../todos/todosController';
import PostsController from '../posts/posts.controller';

// Check if user is loggedIn
// router.use(isLoggedIn);

/*===================================
    Index page route get all memes
=====================================*/
// Display all the videos and images
router.get('/', getIndex);
router.get('/refresh', getIndex);
// user routes
router.use("/users", usersRoute);
// account routes
router.use("/accounts", accountsRoute);
// posts routes
router.use('/posts', postsRoutes);
// router.use('/posts', PostsController);
// comments routes
router.use('/comments', commentsRoutes);

// media routes
router.use('/media', mediaRoutes);

router.use('/search', searchRoutes);

router.use('/tags', tagsRoutes);

router.use('/notifications', notificationsRoutes);

router.all('/todos', todosController)


// router.use("/", reglogRoute);
// app.use("/upload", uploadRoute);
// router.use("/donate", donateRoute);
export default router;
