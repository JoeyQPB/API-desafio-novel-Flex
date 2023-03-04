import { describe, test, assert } from "vitest";
import sinon from "sinon/pkg/sinon-esm";
import { ProductModel } from "../../../../model/product.model";
import { deleteProductController } from "../delete.controller";
import { reqMock } from "./mocks/req-delete.mock";
import { resMock } from "./mocks/res-delete.mock";

describe("deleteProductController", () => {
  test("should delete a product", async () => {
    const deleteOneStub = sinon.stub(ProductModel, "deleteOne").resolves({
      deletedCount: 1,
    });

    const result = await deleteProductController.handle(reqMock, resMock);

    assert.isTrue(deleteOneStub.calledOnceWith({ _id: reqMock.params.id }));
    assert.deepEqual(result, {
      data: {
        deletedCount: 1,
      },
    });
  });
});
