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
import {
  createAward,
  determineRowColours,
  fetchAwards,
} from "../../../src/utils/AwardUtils";

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

  it("WHEN creating an award, THEN return the status of post request", async () => {
    mockedPost.mockReturnValue({ status: 200 });
    const status = await createAward("someTitle", 1);
    expect(status).toBe(200);
  });

  it.each([
    [7, "#FA93FC", "#BA6EBC"],
    [5, "#34E1FA", "#63BCFC"],
    [3, "#34FA4B", "#26AA35"],
    [1, "#FA93FC", "#BA6EBC"],
  ])(
    "WHEN determining the colour of award rows, THEN return colour object",
    (
      awardCost: number,
      expectedPrimaryColour: string,
      expectedSecondaryColour: string
    ) => {
      const colours = determineRowColours(awardCost);
      expect(colours.primaryColour).toEqual(expectedPrimaryColour);
      expect(colours.secondaryColour).toEqual(expectedSecondaryColour);
    }
  );
});
