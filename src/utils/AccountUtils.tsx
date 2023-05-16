import axios, { AxiosResponse } from "axios";
import { ACCOUNT_ID, ACCOUNT_TYPE } from "../constants/LocalStorageConstants";
import { localStorageGet, localStorageStore } from "./LocalStorageUtils";

export const retrieveAccountType = async (
  accountId: string
): Promise<string> => {
  const resp: AxiosResponse = await axios.get(
    `http://localhost:8080/account/${accountId}/type`
  );
  const accountType: string = resp.data;
  return accountType;
};

export const isActiveAccount = async (googleId: string): Promise<boolean> => {
  const resp = await axios.get(
    `http://localhost:8080/account/active/${googleId}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  localStorageStore(ACCOUNT_ID, googleId);
  const isActiveAccount: boolean = resp.data;
  return isActiveAccount;
};
