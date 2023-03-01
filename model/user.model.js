import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  product: [{ type: Types.ObjectId, ref: "Product" }],
});

export const UserModel = model("User", userSchema);
