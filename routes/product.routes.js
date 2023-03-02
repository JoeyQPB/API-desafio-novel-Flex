import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import { ProductModel } from "../model/product.model.js";
import { UserModel } from "../model/user.model.js";
import { validateFields } from "../utils/requeridFields.js";

const productRouter = express.Router();

productRouter.post(
  "/create_product",
  isAuth,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const { error, msg } = validateFields(
        req,
        ["name", "description"],
        ["price"]
      );

      if (error) {
        return res.status(400).json({ msg });
      }

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
    if (!products)
      return res.status(404).json({ msg: "no product has been registered" });
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

productRouter.get("/show/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
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
  isAdmin,
  async (req, res) => {
    const { error, msg } = validateFields(
      req,
      ["name", "description"],
      ["price"]
    );

    if (error) {
      return res.status(400).json({ msg });
    }

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

productRouter.patch(
  "/update_partial/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;
      const updatedPartialProduct = await ProductModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
          $push: { updatedAt: Date.now(), updatedBy: loggedInUser._id },
        },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedPartialProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

productRouter.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const deleteProduct = await ProductModel.deleteOne({
        _id: req.params.id,
      });
      return res.status(200).json(deleteProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

export { productRouter };
