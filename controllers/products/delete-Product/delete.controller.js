import { ProductModel } from "../../../model/product.model.js";

export const deleteProductController = {
  async handle(req, res) {
    try {
      const deleteProduct = await ProductModel.deleteOne({
        _id: req.params.id,
      });
      return res.status(200).json(deleteProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
