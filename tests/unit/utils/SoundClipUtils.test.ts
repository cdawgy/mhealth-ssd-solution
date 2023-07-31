jest.unmock("../../../src/utils/SoundClipUtils");

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

import { SoundClip } from "../../../src/types/SoundClip";
import {fetchAllSoundClips,fetchSoundClip} from "../../../src/utils/SoundClipUtils";

describe("SoundClipUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("WHEN fetching all sound clips, THEN return sound clips", async () => {
    const soundClip: SoundClip = {
      id: 0,
      word: "",
      sound: "",
      dateCreated: new Date(),
      childId: 0,
      locationUrl: ""
    };
    mockedGet.mockReturnValue({ data: [soundClip] });
    const soundClips = await fetchAllSoundClips();
    expect(soundClips.length).toBe(1);
    expect(soundClips[0]).toEqual(soundClip);
  });

  it("WHEN fetching a resources, THEN return a resource", async () => {
    const soundClip: SoundClip = {
      id: 0,
      word: "",
      sound: "",
      dateCreated: new Date(),
      childId: 0,
      locationUrl: ""
    };
    mockedGet.mockReturnValue({ data: soundClip });
    const soundClipResp = await fetchSoundClip("1");
    expect(soundClipResp).toEqual(soundClip);
  });
});
