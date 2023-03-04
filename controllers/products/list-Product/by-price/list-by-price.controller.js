import { ProductModel } from "../../../../model/product.model.js";
import { redisClient } from "../../../../config/redis.config.js";

export const listProductByPriceController = {
  async handle(req, res) {
    try {
      let products;
      products = await redisClient.get(`products-by-price`);
      products = JSON.parse(products);

      if (!products) {
        products = await ProductModel.find({});
        if (!products) {
          return res
            .status(404)
            .json({ msg: "no product has been registered" });
        }
        await redisClient.set(
          `products-by-price`,
          JSON.stringify(products),
          "EX",
          10
        );
        console.log("FROM DATABASE");
      }

      products = products.sort((a, b) => a.price - b.price);
      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
