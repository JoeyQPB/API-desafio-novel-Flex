import { ProductModel } from "../../../../model/product.model.js";

export const updatePartialProductController = {
  async handle(req, res) {
    try {
      const loggedInUser = req.currentUser;
      const updatedPartialProduct = await ProductModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
          $push: { updatedBy: loggedInUser._id },
        },
        { new: true, runValidators: true }
      );

      if (!updatedPartialProduct)
        return res.status(404).json({ msg: "Product not found" });

      return res.status(200).json(updatedPartialProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
