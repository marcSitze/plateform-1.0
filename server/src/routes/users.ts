import express, { Router } from "express";
const router: Router = express.Router();
import {
  getUsers,
  getUserById,
  createUser,
  getUser,
  updateUser,
  login,
  resetPassword,
  requestResetPassword,
} from "../controllers/users";

/*======================
        Get all users
======================== */
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/q?", getUser);
router.put("/:id", updateUser);
router.post("/login", login);
router.post("/auth/requestResetPassword", requestResetPassword);
router.get("/auth/resetPassword", (req, res) => {
  console.log("req.query: ", req.query);
  res.render("users/user", {
    user: { token: req.query.token, userId: req.query.id },
  });
});
router.post("/auth/resetPassword", resetPassword);
// router.get('/account', auth, (req, res) => res.send('hello account'));

/*===============================
        Get an individual user
================================= */
router.get("/:id", getUserById);
export default router;
