jest.unmock("../../../src/utils/NavigationUtils");

const mockedLocalStorageStore = jest.fn();
const mockedLocalStorageGet = jest.fn();
jest.mock("../../../src/utils/LocalStorageUtils", () => {
  return {
    localStorageStore: mockedLocalStorageStore,
    localStorageGet: mockedLocalStorageGet,
  };
});

const mockedGetAccountTableIdReference = jest.fn();
const mockedIsActiveAccount = jest.fn();
const mockedRetrieveAccountType = jest.fn();
jest.mock("../../../src/utils/AccountUtils", () => {
  return {
    getAccountTableIdReference: mockedGetAccountTableIdReference,
    isActiveAccount: mockedIsActiveAccount,
    retrieveAccountType: mockedRetrieveAccountType,
  };
});

import { determineLoginRedirect } from "../../../src/utils/NavigationUtils";

describe("NavigationUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("GIVEN account is active AND account type is parent, WHEN determining the login redirect, THEN return path", async () => {
    mockedIsActiveAccount.mockReturnValue(true);
    mockedRetrieveAccountType.mockReturnValue("parent");
    const redirectPath = await determineLoginRedirect("accountId");
    expect(redirectPath).toBe("/whoIsIt");
  });

  it("GIVEN account is active AND account type is therapist, WHEN determining the login redirect, THEN return path", async () => {
    mockedIsActiveAccount.mockReturnValue(true);
    mockedRetrieveAccountType.mockReturnValue("therapist");
    const redirectPath = await determineLoginRedirect("accountId");
    expect(redirectPath).toBe("/appMainMenu");
  });

  it("GIVEN account is not active, WHEN determining the login redirect, THEN return path", async () => {
    mockedIsActiveAccount.mockReturnValue(false);
    const redirectPath = await determineLoginRedirect("accountId");
    expect(redirectPath).toBe("/createAccount");
  });
});
