import { ProductModel } from "../../../model/product.model.js";

export const listProductByPriceController = {
  async handle(req, res) {
    try {
      const products = await ProductModel.find({});
      if (!products)
        return res.status(404).json({ msg: "no product has been registered" });

      const listOrderByName = products.sort((a, b) => a.price - b.price);
      return res.status(200).json(listOrderByName);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
