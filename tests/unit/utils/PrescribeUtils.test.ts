jest.unmock("../../../src/utils/PrescribeUtils");

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

const mockedGet = jest.fn();
const mockedPost = jest.fn();
jest.mock("axios", () => {
  return {
    get: mockedGet,
    post: mockedPost,
  };
});

import { Child } from "../../../src/types/Child";
import { Prescription } from "../../../src/types/Prescription";
import {
  createChildSelectOptions,
  sendPrescriptionToDatabase,
} from "../../../src/utils/PrescribeUtils";

describe("PrescribeUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("GIVEN account is active AND account type is parent, WHEN determining the login redirect, THEN return path", async () => {
    const child: Child = {
      id: 1,
      parentId: 1,
      firstName: "someName",
      points: 3,
    };
    mockedPost.mockReturnValue({ data: [child] });
    const options = await createChildSelectOptions();
    expect(options.length).toBe(1);
    expect(options[0].value).toBe("1");
    expect(options[0].label).toBe("someName");
  });

  it("GIVEN account is active AND account type is parent, WHEN determining the login redirect, THEN return path", async () => {
    const prescription: Prescription = {
      parentId: "1",
      therapistId: "1",
      sessionTime: "15",
      sessionWordCount: "20",
      sessionWordSet: "wordOne and wordTwo",
      sessionWordSetTitle: "someTitle",
    };
    mockedPost.mockReturnValue({ status: 200 });
    const resp = await sendPrescriptionToDatabase(prescription);
    expect(resp).toBe(200);
  });
});
