jest.unmock("../../../src/utils/LocalStorageUtils");

import {
  localStorageGet,
  localStorageStore,
} from "../../../src/utils/LocalStorageUtils";

describe("LocalStorageUtils", () => {
  it("WHEN getting item from local storage, THEN return item", () => {
    localStorage.setItem("someKey", "someValue");
    const item = localStorageGet("someKey");
    expect(item).toEqual("someValue");
  });

  it("GIVEN key is null, WHEN getting item from local storage, THEN return item", () => {
    const item = localStorageGet("someWrongKey");
    expect(item).toBeUndefined();
  });

  it("WHEN storing value, THEN set value in local storage", () => {
    localStorageStore("someOtherKey", "someValue");
    expect(localStorage.getItem("someOtherKey")).toBe("someValue");
  });
});
