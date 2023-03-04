import sinon from "sinon/pkg/sinon-esm.js";
import { describe, test, expect, afterEach, assert } from "vitest";
import { redisClient } from "../../../../../config/redis.config.js";
import { ProductModel } from "../../../../../model/product.model.js";
import sinonChai from "sinon-chai";
import chai from "chai";
import { listProductByNameController } from "../list-by-name.controller.js";
import { ListOrderByName } from "../../../../../utils/listOrderByName.js";
import { products } from "./mocks/product.js";
import { reqMock } from "../../list/test/mock/req.mock.js";
import { resMock } from "../../list/test/mock/res.mock.js";

chai.use(sinonChai);

describe("listProductByNameController", () => {
  afterEach(() => {
    sinon.restore();
  });

  test("should return products sorted by name from cache when available", async () => {
    const redisGetStub = sinon
      .stub(redisClient, "get")
      .resolves(JSON.stringify(products));
    sinon.stub(ProductModel, "find");
    const result = await listProductByNameController.handle(reqMock, resMock);
    ListOrderByName(products);

    assert.isTrue(redisGetStub.calledOnce);
    expect(result).toEqual(products);
  });

  test("should return products sorted by name FROM DATABASE", async () => {
    const redisGetStub = sinon.stub(redisClient, "get").resolves(null);
    const productFindStub = sinon.stub(ProductModel, "find").resolves(products);
    const redisSetStub = sinon
      .stub(redisClient, "set")
      .resolves("products-by-price", JSON.stringify(products), "EX", 10);

    const result = await listProductByNameController.handle(reqMock, resMock);

    expect(redisGetStub).calledOnce;
    expect(productFindStub).calledOnce;
    expect(redisSetStub).calledOnce;
    expect(result).toEqual(products);
  });

  test("should return 404 when no products have been registered", async () => {
    const redisGetStub = sinon.stub(redisClient, "get").resolves(null);
    const productFindStub = sinon.stub(ProductModel, "find").resolves(null);
    const result = await listProductByNameController.handle(reqMock, resMock);

    expect(redisGetStub).calledOnce;
    expect(productFindStub).calledOnce;
    expect(result).toEqual({ msg: "no product has been registered" });
  });
});
