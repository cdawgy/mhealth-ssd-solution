import { GameState } from "../types/GameState";

export const PRESCRIPTION_META_DATA_ID = "prescriptionMetaData";
export const PRESCRIPTION_WORD_SET = "prescriptionWordSet";
export const INITIAL_GAME_STATE: GameState = {
  validatorConnected: false,
  childPlaying: false,
  wordEventAttemptedWordCount: 0,
  successfulWordEvent: false,
  sender: "",
};
export const CACHED_GAME_STATE = "cachedGameState";
export const CACHED_ROOM_CODE = "cachedRoomCode";

export const FIRST_WORD_IMAGE = "firstWordImage";
export const FIRST_WORD_VALUE = "firstWordValue";
export const SECOND_WORD_IMAGE = "secondWordImage";
export const SECOND_WORD_VALUE = "secondWordValue";

export const GAME_COMPLETED_DATA = "gameCompletedData";
