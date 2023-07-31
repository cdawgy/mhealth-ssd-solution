jest.unmock("../../../src/utils/WebSocketUtils");

// const mockedLocalStorageStore = jest.fn();
// const mockedLocalStorageGet = jest.fn();
// jest.mock("../../../src/utils/LocalStorageUtils", () => {
//   return {
//     localStorageStore: mockedLocalStorageStore,
//     localStorageGet: mockedLocalStorageGet,
//   };
// });

// const mockedGetAccountTableIdReference = jest.fn();
// const mockedIsActiveAccount = jest.fn();
// const mockedRetrieveAccountType = jest.fn();
// jest.mock("../../../src/utils/AccountUtils", () => {
//   return {
//     getAccountTableIdReference: mockedGetAccountTableIdReference,
//     isActiveAccount: mockedIsActiveAccount,
//     retrieveAccountType: mockedRetrieveAccountType,
//   };
// });

// const mockedGet = jest.fn();
// const mockedPost = jest.fn();
// jest.mock("axios", () => {
//   return {
//     get: mockedGet,
//     post: mockedPost,
//   };
// });

jest.mock("stompjs",()=>{
  return {
    
  }
})

import { SoundClip } from "../../../src/types/SoundClip";
import { connectToRoom } from "../../../src/utils/WebSocketUtils";

describe("WebSocketUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("", () => {
    const callback = jest.fn();
    const room = connectToRoom(callback, 1);

  });
});
