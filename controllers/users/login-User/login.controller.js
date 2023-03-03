import bcrypt from "bcrypt";
import { UserModel } from "../../../model/user.model.js";
import { generateToken } from "../../../config/jwt.config.js";

export const loginUserController = {
  async login(req, res) {
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
  },
};
