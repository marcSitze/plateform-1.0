import * as express from "express";
import {
  createComment,
  getComment,
  getComments,
  updateComment,
  getCommentsByQuery,
} from "../controllers/comments";
import { auth } from "../middlewares/auth/auth";
const router = express.Router();

// Use the jsonewebtoken middleware
router.use(auth);

router.post("/", createComment);
router.get("/:id", getComment);
router.get("/", getComments);
router.get("/query/q?", getCommentsByQuery);
router.put("/:id", updateComment);

export default router;
