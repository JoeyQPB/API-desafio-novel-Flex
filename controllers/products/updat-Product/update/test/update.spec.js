import sinon from "sinon/pkg/sinon-esm.js";
import { describe, test, expect } from "vitest";
import sinonChai from "sinon-chai";
import chai from "chai";
import { updateProductController } from "../update.controller";
import { ProductModel } from "../../../../../model/product.model";
import { reqMock } from "./mocks/req.mock";
import { resMock } from "./mocks/reqs.mock";

chai.use(sinonChai);

describe("updateProductController", () => {
  test("should updated product when product is updated successfully", async () => {
    const productModelUpdate = sinon
      .stub(ProductModel, "findOneAndUpdate")
      .resolves(reqMock.body);

    const result = await updateProductController.handle(reqMock, resMock);

    expect(productModelUpdate).calledOnceWith(
      { _id: reqMock.params.id },
      {
        ...reqMock.body,
        $push: { updatedBy: reqMock.currentUser._id },
      },
      { new: true, runValidators: true }
    );

    expect(result).toEqual(reqMock.body);
  });
});
