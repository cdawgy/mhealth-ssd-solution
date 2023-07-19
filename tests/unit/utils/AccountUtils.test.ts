jest.unmock("../../../src/utils/AccountUtils");

const mockedGet = jest.fn();
const mockedPost = jest.fn();
jest.mock("axios", () => {
  return {
    get: mockedGet,
    post: mockedPost,
  };
});

const mockedLocalStorageStore = jest.fn();
const mockedLocalStorageGet = jest.fn();
jest.mock("../../../src/utils/LocalStorageUtils", () => {
  return {
    localStorageStore: mockedLocalStorageStore,
    localStorageGet: mockedLocalStorageGet,
  };
});

import "jest";
import {
  retrieveAccountType,
  getAccountTableIdReference,
  isActiveAccount,
  getAccountTypeMenuItems,
  isTherapist,
  isParent,
  isChild,
  createAccount,
  getAllTherapists,
  createSelectOptionsForTherapist,
  getChildPoints,
} from "../../../src/utils/AccountUtils";
import { NewAccount } from "../../../src/types/NewAccount";
import { AxiosResponse } from "axios";
import { Therapist } from "../../../src/types/Therapist";

describe("Account Utils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("WHEN a users account type is retrieved, THEN return the account type as string", async () => {
    mockedGet.mockReturnValue({ data: "someAccountType" });
    const resp = await retrieveAccountType("someGoogleId");
    expect(resp).toEqual("someAccountType");
  });

  it("WHEN ID for account table is retrieved, THEN return ID as number", async () => {
    mockedGet.mockReturnValue({ data: 1 });
    const resp = await getAccountTableIdReference(
      "someAccountType",
      "someGoogleId"
    );
    expect(resp).toBe(1);
  });

  it("WHEN a check if the account exists, THEN return true if account exists", async () => {
    mockedGet.mockReturnValue({ data: true });
    const resp = await isActiveAccount("someGoogleId");
    expect(mockedLocalStorageStore).toBeCalledWith("accountId", "someGoogleId");
    expect(resp).toBeTruthy();
  });

  it("GIVEN a child is logged in, WHEN menu items per account are retrieved, THEN return array of menu items", () => {
    mockedLocalStorageGet.mockReturnValue("child");
    const menuItems = getAccountTypeMenuItems();
    expect(menuItems.length).toBe(2);
  });

  it.each([
    [isTherapist, "therapist"],
    [isParent, "parent"],
    [isChild, "child"],
  ])(
    "WHEN checking for account type, THEN return true if locally stored account matches",
    (isAccountMethod: () => boolean, accountConstant: string) => {
      mockedLocalStorageGet.mockReturnValueOnce(accountConstant);
      const resp = isAccountMethod();
      expect(resp).toBeTruthy();
    }
  );

  it("WHEN creating a new account, THEN retrieve google account data and post new account", async () => {
    const newAccount: NewAccount = {
      accountType: "someAccountName",
      childsName: "someChildsName",
      selectedTherapist: "someSelectedTherapist",
    };
    const accountMetaData = {
      givenName: "someGivenName",
      familyName: "someFamilyName",
    };
    const axiosResponse = {
      data: undefined,
      status: 200,
      statusText: "someStatus",
      headers: {},
    };
    mockedLocalStorageGet.mockReturnValueOnce(accountMetaData);
    mockedLocalStorageGet.mockReturnValueOnce("someGoogleId");
    mockedPost.mockReturnValueOnce(axiosResponse);
    const resp = await createAccount(newAccount);
    expect(resp).toEqual(axiosResponse);
  });

  it("WHEN an API call is made to /therapists/all, THEN return a list of all therapists", async () => {
    const therapist: Therapist = {
      id: 1,
      googleId: "someGoogleId",
      firstName: "someFirstName",
      surname: "someSurname",
    };
    mockedGet.mockReturnValueOnce({ data: [therapist] });
    const listOfTherapists = await getAllTherapists();
    expect(listOfTherapists.length).toBe(1);
  });

  it("WHEN creating react dropdown select options for therapists, THEN return list of SelectOptions", async () => {
    const therapist: Therapist = {
      id: 1,
      googleId: "someGoogleId",
      firstName: "someFirstName",
      surname: "someSurname",
    };
    mockedGet.mockReturnValueOnce({ data: [therapist] });
    const therapistOptions = await createSelectOptionsForTherapist();
    expect(therapistOptions.length).toBe(1);
    expect(therapistOptions[0].label).toBe("someFirstName someSurname");
    expect(therapistOptions[0].value).toBe("1");
  });

  it("WHEN accessing childs point count, THEN return number value of childs points", async () => {
    mockedLocalStorageGet.mockReturnValueOnce(1);
    mockedGet.mockReturnValueOnce({ data: 1 });
    const points = await getChildPoints();
    expect(points).toBe(1);
  });
});
