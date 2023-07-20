jest.unmock("../../../src/utils/LoginValidationUtils");

const mockedLocalStorageStore = jest.fn();
const mockedLocalStorageGet = jest.fn();
jest.mock("../../../src/utils/LocalStorageUtils", () => {
  return {
    localStorageStore: mockedLocalStorageStore,
    localStorageGet: mockedLocalStorageGet,
  };
});

const mockedIsTokenExpired = jest.fn();
jest.mock("../../../src/utils/AuthTokenUtils", () => {
  return {
    isTokenExpired: mockedIsTokenExpired,
  };
});

import { isUserLoggedIn } from "../../../src/utils/LoginValidationUtils";

describe("LoginValidationUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("GIVEN login token is defined and not expired, WHEN checking if the user is logged in, THEN return true", () => {
    mockedLocalStorageGet.mockReturnValue({ expires_at: 100 });
    mockedIsTokenExpired.mockReturnValue(false);
    const isLoggedIn = isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  it("GIVEN login token is undefined, WHEN checking if the user is logged in, THEN return false", () => {
    mockedLocalStorageGet.mockReturnValue(undefined);
    const isLoggedIn = isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  it("GIVEN login token is null, WHEN checking if the user is logged in, THEN return false", () => {
    mockedLocalStorageGet.mockReturnValue(null);
    const isLoggedIn = isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  it("GIVEN login token is defined and expired, WHEN checking if the user is logged in, THEN return false", () => {
    mockedLocalStorageGet.mockReturnValue({ expires_at: 100 });
    mockedIsTokenExpired.mockReturnValue(true);
    const isLoggedIn = isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});
