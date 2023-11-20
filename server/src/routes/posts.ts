import * as express from "express";
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  likePost
} from "../controllers/posts";
import { auth } from "../middlewares/auth/auth";
const router = express.Router();

// Use the jsonewebtoken middleware
router.use(auth);

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post('/:id/like', likePost)
router.put("/:id", updatePost);

export default router;
