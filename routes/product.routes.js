import express from "express";
import { createProductController } from "../controllers/products/create.controller.js";
import { deleteProductController } from "../controllers/products/delete.controller.js";
import { listProductByNameController } from "../controllers/products/list-by-name.controller.js";
import { listProductByPriceController } from "../controllers/products/list-by-price.controller.js";
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
  createProductController.handle
);

productRouter.get(
  "/list",
  isAuth,
  attachCurrentUser,
  listProductController.handle
);

// order by name
productRouter.get(
  "/list_name",
  isAuth,
  attachCurrentUser,
  listProductByNameController.handle
);

productRouter.get(
  "/list_price",
  isAuth,
  attachCurrentUser,
  listProductByPriceController.handle
);

productRouter.get(
  "/show/:id",
  isAuth,
  attachCurrentUser,
  showProductController.handle
);

productRouter.put(
  "/update/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  updateProductController.handle
);

productRouter.patch(
  "/update_partial/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  updatePartialProductController.handle
);

productRouter.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  deleteProductController.handle
);

export { productRouter };
