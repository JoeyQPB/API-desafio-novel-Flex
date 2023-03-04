import { describe, test, assert } from "vitest";
import sinon from "sinon/pkg/sinon-esm";
import { ProductModel } from "../../../../../model/product.model";
import { filterByDescriptionController } from "../filter-by-description.controller";
import { reqMock } from "./mocks/req.mock";
import { resMock } from "./mocks/res.mock";
import { allProducts } from "./mocks/all-products.mock";

describe("filterByDescriptionController", () => {
  test("should return a list of products filtred by description", async () => {
    const productModelFind = sinon
      .stub(ProductModel, "find")
      .resolves(allProducts);
    const result = await filterByDescriptionController.handle(reqMock, resMock);

    assert.deepEqual(result, [allProducts[0], allProducts[1]]);
  });
});
