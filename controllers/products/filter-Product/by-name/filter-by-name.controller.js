import { ProductModel } from "../../../../model/product.model.js";

export const filterByNameController = {
  async handle(req, res) {
    try {
      if (!req.body.inputName || typeof req.body.inputName !== "string") {
        return res.status(400).json({
          msg: `"${req.body.inputName}" is not a valid input. inputName has to be defined and be a string!`,
        });
      }

      const productsFilter = await ProductModel.findOne({
        name: req.body.inputName,
      });

      if (!productsFilter)
        return res.status(404).json({ msg: "Product not found" });

      return res.status(200).json(productsFilter);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
