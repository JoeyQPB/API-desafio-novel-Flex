import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import { ProductModel } from "../model/product.model.js";
import { UserModel } from "../model/user.model.js";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  return res.status(200).json({ msg: "ok" });
});

productRouter.post(
  "/create_product",
  isAuth,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const requireFields = ["name", "description"];
      let error = false;
      let fieldError;
      requireFields.forEach((field) => {
        if (!req.body[`${field}`] || typeof req.body[`${field}`] !== "string") {
          error = true;
          fieldError = field;
        }
      });

      if (error) {
        return res.status(400).json({ msg: `Can not defined ${fieldError}` });
      }

      if (typeof req.body.price !== "number")
        return res.status(400).json({ msg: "Price has be a number" });

      const loggedInUser = req.currentUser;
      const newProduct = await ProductModel.create({
        ...req.body,
        createdBy: loggedInUser._id,
      });

      await UserModel.findOneAndUpdate(
        { _id: loggedInUser._id },
        { $push: { products: newProduct._id } }
      );

      return res.status(201).json(newProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

productRouter.get("/list", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

productRouter.get("/show/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

productRouter.put(
  "/update/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
          $push: { updatedAt: Date.now(), updatedBy: loggedInUser._id },
        },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

export { productRouter };
