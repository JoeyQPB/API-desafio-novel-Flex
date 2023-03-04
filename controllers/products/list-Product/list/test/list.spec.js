import sinon from "sinon/pkg/sinon-esm.js";
import { describe, test, expect, afterEach, assert } from "vitest";
import { redisClient } from "../../../../../config/redis.config.js";
import { ProductModel } from "../../../../../model/product.model.js";
import { listProductController } from "../list.controller.js";
import sinonChai from "sinon-chai";
import chai from "chai";
import { products } from "./mock/product.mock.js";
import { reqMock } from "./mock/req.mock.js";
import { resMock } from "./mock/res.mock.js";

chai.use(sinonChai);

describe("listProductController", () => {
  afterEach(() => {
    sinon.restore();
  });

  test("should return products from cache", async () => {
    const redisGetStub = sinon
      .stub(redisClient, "get")
      .resolves(JSON.stringify(products));

    const result = await listProductController.handle(reqMock, resMock);
    assert.isTrue(redisGetStub.calledOnceWith("products"));

    expect(result).toEqual(products);
  });

  test("should return products from database and store in cache", async () => {
    const redisSetStub = sinon.stub(redisClient, "set").resolves("OK");
    const productFindStub = sinon.stub(ProductModel, "find").resolves(products);
    const redisGetStub = sinon.stub(redisClient, "get").resolves(null);

    const result = await listProductController.handle(reqMock, resMock);
    expect(productFindStub).calledOnce;
    expect(redisSetStub).calledOnceWith(
      "products",
      JSON.stringify(products),
      "EX",
      10
    );
    expect(redisGetStub).calledOnceWith("products");
    expect(result).toEqual(products);
  });

  test("should return 404 when no products found in the database", async () => {
    const productFindStub = sinon.stub(ProductModel, "find").resolves(null);
    const result = await listProductController.handle(reqMock, resMock);
    expect(productFindStub).calledOnce;
    expect(result).toEqual({
      msg: "no product has been registered",
    });
  });
});
