jest.unmock("../../../src/utils/AuthTokenUtils");

import { isTokenExpired } from "../../../src/utils/AuthTokenUtils";

describe("AuthTokenUtils", () => {
  it("GIVEN a token expirey time, WHEN isTokenExpired is called, THEN return true if token is expired", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-01-01"));
    const isExpired = isTokenExpired(1672574);
    expect(isExpired).toBeTruthy();
  });
});
