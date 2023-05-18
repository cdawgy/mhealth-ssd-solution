import axios, { AxiosResponse } from "axios";
import { ACCOUNT_ID, ACCOUNT_TYPE } from "../constants/LocalStorageConstants";
import { localStorageGet, localStorageStore } from "./LocalStorageUtils";
import { MenuItemType } from "../types/MenuItem";
import { MenuItems } from "../constants/MenuItemsData";
import { AccountMenuItems } from "../types/AccountMenuItems";

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
    `http://localhost:8080/account/${googleId}/active`,
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

export const getAccountTypeMenuItems = (): MenuItemType[] => {
  const accountType: string = localStorageGet(ACCOUNT_TYPE);
  return MenuItems[accountType as keyof AccountMenuItems];
};
