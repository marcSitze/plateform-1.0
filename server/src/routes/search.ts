import * as express from "express";

import { auth } from "../middlewares/auth/auth";
const router = express.Router();

import { searchByQuery } from '../controllers/search'
// Use the jsonewebtoken middleware
router.use(auth);

router.get("/", searchByQuery);

export default router;
