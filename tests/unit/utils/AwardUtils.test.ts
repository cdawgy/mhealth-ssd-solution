jest.unmock("../../../src/utils/AuthTokenUtils");

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

import { Award } from "../../../src/types/Award";
import { fetchAwards } from "../../../src/utils/AwardUtils";

describe("AuthTokenUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  
  it("WHEN fetching awards, THEN return map of awards for account", async () => {
    const awardStub: Award = {
      id: 1,
      parentId: 1,
      title: "someAward",
      cost: 3,
    };
    const awardMapStub = new Map<string, Award[]>();
    awardMapStub.set("3", [awardStub]);
    mockedPost.mockReturnValue({ data: awardMapStub });
    const awardMap = await fetchAwards();
    expect(awardMap.size).toBe(1);
    expect(awardMap.get("3")).toEqual([awardStub]);
  });
});
