import { ProductModel } from "../../model/product.model.js";

export const filterByNameController = {
  async handle(req, res) {
    try {
      if (!req.body.inputName || typeof req.body.inputName !== "string") {
        return res.status(400).json({
          msg: `"${req.body.inputName}" is not a valid input. inputName has to be defined and be a string!`,
        });
      }

      const productsfilter = await ProductModel.find({
        name: req.body.inputName,
      });
      if (productsfilter.length < 1)
        return res.status(404).json({ msg: "Product not found" });

      return res.status(200).json(productsfilter);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
