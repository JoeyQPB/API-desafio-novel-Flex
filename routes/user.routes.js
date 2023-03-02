import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../model/user.model.js";
import { generateToken } from "../config/jwt.config.js";

const userRouter = express.Router();

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

userRouter.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password)
      return res.status(400).json({ msg: "fill in all fields" });

    const user = await UserModel.findOne({ name });

    if (!(await bcrypt.compare(password, user.passwordHash)))
      return res.status(404).json({ msg: "invalid email or password " });

    const token = generateToken(user);

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.get("/list", async (req, res) => {
  try {
    console.log("oi");
    const usersList = await UserModel.find({});
    return res.status(200).json(usersList);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
