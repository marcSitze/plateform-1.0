import * as express from "express";

import { auth } from "../middlewares/auth/auth";
const router = express.Router();

import { createNotification, getNotifications } from '../controllers/notifications'
// Use the jsonewebtoken middleware
router.use(auth);

router.post("/", createNotification);
router.get("/", getNotifications);

export default router;
