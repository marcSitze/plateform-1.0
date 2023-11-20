import * as express from "express";

import { auth } from "../middlewares/auth/auth";
const router = express.Router();

import { createTag, getTags } from '../controllers/tags'
// Use the jsonewebtoken middleware
router.use(auth);

router.get("/", getTags);
router.post("/", createTag);

export default router;
