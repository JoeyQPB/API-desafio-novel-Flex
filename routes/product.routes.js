import express from "express";
import { createProductController } from "../controllers/products/create.controller.js";
import { deleteProductController } from "../controllers/products/delete.controller.js";
import { listProductController } from "../controllers/products/list.controller.js";
import { showProductController } from "../controllers/products/show.controller.js";
import { updatePartialProductController } from "../controllers/products/update-partial.controller.js";
import { updateProductController } from "../controllers/products/update.controller.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/create_product",
  isAuth,
  attachCurrentUser,
  isAdmin,
  createProductController.create
);

productRouter.get(
  "/list",
  isAuth,
  attachCurrentUser,
  listProductController.list
);

productRouter.get(
  "/show/:id",
  isAuth,
  attachCurrentUser,
  showProductController.show
);

productRouter.put(
  "/update/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  updateProductController.update
);

productRouter.patch(
  "/update_partial/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  updatePartialProductController.updatePartial
);

productRouter.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  deleteProductController.delete
);

export { productRouter };
