import { ProductModel } from "../../model/product.model.js";

export const filterByDescriptionController = {
  async handle(req, res) {
    try {
      if (
        !req.body.inputDescription ||
        typeof req.body.inputDescription !== "string"
      ) {
        return res.status(400).json({
          msg: `"${req.body.inputDescription}" is not a valid input. inputDescription has to be defined and be a string!`,
        });
      }
      const allProducts = await ProductModel.find({});

      const inputSplited = req.body.inputDescription.split(" ");

      const productsFilter = allProducts.filter((product) => {
        let productDescriptionArray = product.description.split(" ");
        for (let i = 0; i < inputSplited.length; i++) {
          if (productDescriptionArray.includes(inputSplited[i])) {
            return true;
          }
        }
      });

      if (productsFilter.length < 1)
        return res.status(404).json({ msg: "Product not found" });
      return res.status(200).json(productsFilter);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
