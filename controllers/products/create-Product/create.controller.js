import { ProductModel } from "../../../model/product.model.js";
import { UserModel } from "../../../model/user.model.js";
import { validateFields } from "../../../utils/requeridFields.js";

export const createProductController = {
  async handle(req, res) {
    try {
      const { error, msg } = validateFields(
        req,
        ["name", "description"],
        ["price"]
      );

      if (error) {
        return res.status(400).json({ msg });
      }

      const loggedInUser = req.currentUser;
      const newProduct = await ProductModel.create({
        ...req.body,
        createdBy: loggedInUser._id,
      });

      await UserModel.findOneAndUpdate(
        { _id: loggedInUser._id },
        { $push: { products: newProduct._id } }
      );

      return res.status(201).json(newProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
