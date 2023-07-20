jest.unmock("../../../src/utils/CustomWordUtils");

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

import {
  fetchAllGroupedWords,
  fetchAllGroupings,
  fetchAllProcessPresets,
  fetchAllProcesses,
  fetchProcessPreset,
} from "../../../src/utils/CustomWordUtils";

describe("CustomWordUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("WHEN fetching all groupings, THEN return list of group options", async () => {
    mockedGet.mockReturnValue({ data: ["All", "t"] });
    const groupingOptions = await fetchAllGroupings();
    expect(groupingOptions.length).toBe(2);
    expect(groupingOptions[0].label).toEqual("All");
    expect(groupingOptions[0].value).toEqual("All");
    expect(groupingOptions[1].label).toEqual("/t/");
    expect(groupingOptions[1].value).toEqual("t");
  });

  it("WHEN fetching grouped words, THEN return array of words", async () => {
    mockedGet.mockReturnValue({ data: [{ id: 1, word: "someWord" }] });
    const words = await fetchAllGroupedWords("someGrouping");
    expect(words.length).toBe(1);
    expect(words[0].value).toBe("1");
    expect(words[0].label).toBe("someWord");
  });

  it("WHEN fetching process, THEN return options", async () => {
    mockedGet.mockReturnValue({ data: ["process"] });
    const options = await fetchAllProcesses();
    expect(options.length).toBe(1);
    expect(options[0].label).toBe("process");
    expect(options[0].value).toBe("process");
  });

  it("WHEN fetching all presets, THEN return sanitized options", async () => {
    mockedGet.mockReturnValue({ data: ["process"] });
    const options = await fetchAllProcessPresets("process");
    expect(options.length).toBe(1);
    expect(options[0].label).toBe("process");
    expect(options[0].value).toBe("process");
  });

  it("WHEN fetching process presets, THEN return word array", async () => {
    const data = [{ first: "first", second: "second" }];
    mockedGet.mockReturnValue({ data: data });
    const presets = await fetchProcessPreset("process", "preset");
    expect(presets).toEqual(data);
  });
});
