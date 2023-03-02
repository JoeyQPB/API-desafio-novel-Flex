import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { signupUserController } from "../controllers/users/signup.controller.js";
import { loginUserController } from "../controllers/users/login.controller.js";
import { listUserController } from "../controllers/users/list.controller.js";
import { profileUserController } from "../controllers/users/profile.controller.js";
import { apiLimiter } from "../middlewares/limiter.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUserController.signup);

userRouter.post("/login", loginUserController.login);

userRouter.get("/list", apiLimiter, listUserController.list);

userRouter.get(
  "/profile",
  isAuth,
  attachCurrentUser,
  profileUserController.profile
);

export { userRouter };
