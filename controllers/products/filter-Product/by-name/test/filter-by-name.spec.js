import { describe, test, assert } from "vitest";
import sinon from "sinon/pkg/sinon-esm";
import { ProductModel } from "../../../../../model/product.model";
import { reqMock } from "./mocks/req.mock";
import { resMock } from "./mocks/res.mock";
import { allProducts } from "./mocks/all-products.mock";
import { filterByNameController } from "../filter-by-name.controller";

describe("filterByDescriptionController", () => {
  test("should return a product filtred by name", async () => {
    const productModelFindOne = sinon
      .stub(ProductModel, "findOne")
      .resolves(allProducts);
    const result = await filterByNameController.handle(reqMock, resMock);

    assert.isTrue(
      productModelFindOne.calledOnceWith({ name: reqMock.body.inputName })
    );
    assert.deepEqual(result[0], allProducts[0]);
  });
});
