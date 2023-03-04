import { ProductModel } from "../../../../model/product.model";
import { UserModel } from "../../../../model/user.model";
import { createProductController } from "../create.controller";
import { describe, test, assert } from "vitest";
import sinon from "sinon/pkg/sinon-esm";
import { reqSuccessMock } from "./mocks/req-success.mock";
import { resMock } from "./mocks/res.mock";
import { newProductMock } from "./mocks/new-product.mock";
import { reqMissingPriceMock } from "./mocks/req-missing-price.mock";
import { reqMissingNameMock } from "./mocks/req-missing-name.mock";

describe("createProductController", () => {
  test("should create a new product", async () => {
    const productModelCreate = sinon
      .stub(ProductModel, "create")
      .resolves(newProductMock);
    const userModelUpdate = sinon
      .stub(UserModel, "findOneAndUpdate")
      .resolves();

    const result = await createProductController.handle(
      reqSuccessMock,
      resMock
    );

    assert.isTrue(
      productModelCreate.calledOnceWith({
        ...reqSuccessMock.body,
        createdBy: reqSuccessMock.currentUser._id,
        id: 1,
      })
    );
    assert.isTrue(
      userModelUpdate.calledOnceWith(
        { _id: reqSuccessMock.currentUser._id },
        { $push: { products: newProductMock._id } }
      )
    );
    assert.deepEqual(result, newProductMock);
  });

  test("should return error message when required fields (price) are missing", async () => {
    const result = await createProductController.handle(
      reqMissingPriceMock,
      resMock
    );

    assert.deepEqual(result, {
      msg: "Missing required fields: price",
    });
  });

  test("should return error message when required fields (description) are missing", async () => {
    const result = await createProductController.handle(
      reqMissingNameMock,
      resMock
    );

    assert.deepEqual(result, {
      msg: "Missing required fields: name",
    });
  });
});
