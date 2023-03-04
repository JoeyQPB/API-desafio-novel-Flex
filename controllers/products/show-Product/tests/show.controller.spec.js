import { redisClient } from "../../../../config/redis.config.js";
import { ProductModel } from "../../../../model/product.model.js";
import { test, assert, describe, afterEach } from "vitest";
import { showProductController } from "../show.controller.js";
import sinon from "sinon/pkg/sinon-esm";
import { product } from "./mocks/product.mock.js";
import { reqRedisMock } from "./mocks/req-redis.mock.js";

describe("showProductController", () => {
  const resRedisMock = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub().returns(product),
  };

  afterEach(() => {
    sinon.restore(); // Restaura todos os stubs para seus valores originais após cada teste
  });

  test("should return a product from Redis cache if it exists", async () => {
    sinon.stub(redisClient, "get").resolves(JSON.stringify(product));

    const result = await showProductController.handle(
      reqRedisMock,
      resRedisMock
    );

    // Assert that Redis client's `get` method was called with the correct key
    assert.isTrue(
      redisClient.get.calledOnceWith(`product-${reqRedisMock.params.id}`)
    );

    assert.deepEqual(result, product);
  });

  test("should return a product from the database if it does not exist in Redis cache", async () => {
    sinon.stub(redisClient, "get").resolves(null);
    sinon.stub(ProductModel, "findById").resolves(product);

    sinon.stub(redisClient, "set").resolves(true);

    await showProductController.handle(reqRedisMock, resRedisMock);

    // Assert that Redis client's `get` method was called with the correct key
    assert.isTrue(
      redisClient.get.calledOnceWith(`product-${reqRedisMock.params.id}`)
    );

    // Assert that ProductModel's `findById` method was called with the correct ID
    assert.isTrue(ProductModel.findById.calledOnceWith(reqRedisMock.params.id));

    // Assert that Redis client's `set` method was called with the correct key and value
    assert.isTrue(
      redisClient.set.calledOnceWith(
        `product-${reqRedisMock.params.id}`,
        JSON.stringify(product),
        "EX",
        10
      )
    );
  });
});

// Nesse código, definimos um afterEach hook para restaurar todos os stubs para seus valores originais após
// cada teste. Além disso, criamos variáveis para armazenar o objeto req e o objeto res em cada teste, que
// foram modificados de acordo com a sugestão anterior. Também adicionamos sinon.stub() em volta de todas as
// funções stub para evitar o erro "TypeError: Attempted to wrap get which is already wrapped".
// Por fim, corrigimos o nome do stub da função productModelFindByIdStub para ProductModel.findById.
