import { ProductModel } from "../../../model/product.model.js";

export const listProductController = {
  async handle(req, res) {
    try {
      const products = await ProductModel.find({});
      if (!products)
        return res.status(404).json({ msg: "no product has been registered" });
      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
