import { ProductModel } from "../../../model/product.model.js";

export const listProductByNameController = {
  async handle(req, res) {
    try {
      const products = await ProductModel.find({});
      if (!products)
        return res.status(404).json({ msg: "no product has been registered" });

      const listOrderByName = products.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return res.status(200).json(listOrderByName);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
