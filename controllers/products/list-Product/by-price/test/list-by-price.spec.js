import sinon from "sinon/pkg/sinon-esm.js";
import { describe, test, expect, afterEach, assert } from "vitest";
import { redisClient } from "../../../../../config/redis.config.js";
import { ProductModel } from "../../../../../model/product.model.js";
import { listProductByPriceController } from "../list-by-price.controller.js";
import sinonChai from "sinon-chai";
import chai from "chai";
import { products } from "./mocks/product.js";
import { resMock } from "../../list/test/mock/res.mock.js";
import { reqMock } from "../../list/test/mock/req.mock.js";

chai.use(sinonChai);

describe("listProductByPriceController", () => {
  afterEach(() => {
    sinon.restore();
  });

  test("should return products sorted by price from cache when available", async () => {
    const redisGetStub = sinon
      .stub(redisClient, "get")
      .resolves(JSON.stringify(products));
    sinon.stub(ProductModel, "find");
    const result = await listProductByPriceController.handle(reqMock, resMock);
    products.sort((a, b) => a.price - b.price);

    assert.isTrue(redisGetStub.calledOnce);
    expect(result).toEqual(products);
  });

  test("should return products sorted by price FROM DATABASE", async () => {
    const redisGetStub = sinon.stub(redisClient, "get").resolves(null);

    const productFindStub = sinon.stub(ProductModel, "find").resolves(products);

    const redisSetStub = sinon
      .stub(redisClient, "set")
      .resolves("products-by-price", JSON.stringify(products), "EX", 10);

    const result = await listProductByPriceController.handle(reqMock, resMock);

    expect(redisGetStub).calledOnce;
    expect(productFindStub).calledOnce;
    expect(redisSetStub).calledOnce;
    expect(result).toEqual(products);
  });

  test("should return 404 when no products have been registered", async () => {
    const redisGetStub = sinon.stub(redisClient, "get").resolves(null);
    const productFindStub = sinon.stub(ProductModel, "find").resolves(null);
    const result = await listProductByPriceController.handle(reqMock, resMock);

    expect(redisGetStub).calledOnce;
    expect(productFindStub).calledOnce;
    expect(result).toEqual({ msg: "no product has been registered" });
  });
});
