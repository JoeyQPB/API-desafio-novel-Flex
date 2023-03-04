import { redisClient } from "../../../config/redis.config.js";
import { ProductModel } from "../../../model/product.model.js";

export const showProductController = {
  async handle(req, res) {
    try {
      let product = "undefined";
      product = await redisClient.get(`product-${req.params.id}`);
      product = JSON.parse(product);

      if (!product) {
        product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        // padrãoKEY: product - productId;
        await redisClient.set(
          `product-${product._id}`,
          JSON.stringify(product),
          `EX`,
          10
        );
        console.log("FROM DATABASE");
      }

      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
