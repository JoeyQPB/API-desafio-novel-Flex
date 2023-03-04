import express from "express";
import { createProductController } from "../controllers/products/create-Product/create.controller.js";
import { deleteProductController } from "../controllers/products/delete-Product/delete.controller.js";
import { filterByDescriptionController } from "../controllers/products/filter-Product/by-description/filter-by-description.controller.js";
import { filterByNameController } from "../controllers/products/filter-Product/by-name/filter-by-name.controller.js";
import { listProductByNameController } from "../controllers/products/list-Product/by-name/list-by-name.controller.js";
import { listProductByPriceController } from "../controllers/products/list-Product/by-price/list-by-price.controller.js";
import { listProductController } from "../controllers/products/list-Product/list/list.controller.js";
import { showProductController } from "../controllers/products/show-Product/show.controller.js";
import { updatePartialProductController } from "../controllers/products/updat-Product/update-partaial/update-partial.controller.js";
import { updateProductController } from "../controllers/products/updat-Product/update/update.controller.js";

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

productRouter.post(
  "/filter_name",
  isAuth,
  attachCurrentUser,
  filterByNameController.handle
);

productRouter.post(
  "/filter_description",
  isAuth,
  attachCurrentUser,
  filterByDescriptionController.handle
);

productRouter.get(
  "/list",
  isAuth,
  attachCurrentUser,
  listProductController.handle
);

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
