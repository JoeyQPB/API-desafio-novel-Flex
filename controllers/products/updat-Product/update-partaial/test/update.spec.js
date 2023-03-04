import sinon from "sinon/pkg/sinon-esm.js";
import { describe, test, expect } from "vitest";
import sinonChai from "sinon-chai";
import chai from "chai";
import { ProductModel } from "../../../../../model/product.model";
import { updatePartialProductController } from "../update-partial.controller";
import { reqMock } from "./mocks/req.mock";
import { resMock } from "./mocks/res.mock";

chai.use(sinonChai);

describe("updatePartialProductController", () => {
  test("should updated product when product is updated successfully", async () => {
    const productModelUpdatePartial = sinon
      .stub(ProductModel, "findOneAndUpdate")
      .resolves(reqMock.body);

    const result = await updatePartialProductController.handle(
      reqMock,
      resMock
    );

    expect(productModelUpdatePartial).calledOnceWith(
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
