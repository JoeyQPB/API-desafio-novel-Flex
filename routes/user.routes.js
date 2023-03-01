import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../model/user.model.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello" });
});

userRouter.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ msg: "Password is required" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    delete newUser._doc.passwordHash;
    return res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
