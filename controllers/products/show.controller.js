import { ProductModel } from "../../model/product.model.js";

export const showProductController = {
  async show(req, res) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });
      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
