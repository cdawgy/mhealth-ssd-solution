import { LOGIN_TOKEN } from "../constants/LocalStorageConstants";
import { GoogleAuthToken } from "../types/GoogleAuthToken";
import { isTokenExpired } from "./AuthTokenUtils";
import { localStorageGet } from "./LocalStorageUtils";

export const isUserLoggedIn = (): boolean => {
  const tokenObject: GoogleAuthToken = localStorageGet(LOGIN_TOKEN);
  if (tokenObject == undefined) {
    return false;
  }

  if (isTokenExpired(tokenObject.expires_at)) {
    return false;
  }

  return true;
};
