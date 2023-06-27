import { GameState } from "../types/GameState";

export const PRESCRIPTION_META_DATA_ID = "prescriptionMetaData";
export const INITIAL_GAME_STATE: GameState = {
  validatorConnected: false,
  childPlaying: false,
  wordEventAttemptedWordCount: 0,
  successfulWordEvent: false,
};
export const CACHED_GAME_STATE = "cachedGameState";
export const CACHED_ROOM_CODE = "cachedRoomCode";
