import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  name: { type: String, require: true, trim: true, uppercase: true },
  description: { type: String, require: true, trim: true },
  price: { type: Number, require: true },
  createdBy: { type: Types.ObjectId, ref: "User", require: true },
  createdAt: { type: Date, default: Date.now() },
  updatedBy: [{ type: Types.ObjectId, ref: "User", require: true }],
});

export const ProductModel = model("Product", productSchema);
