import axios, { AxiosResponse } from "axios";
import {
  ACCOUNT_ID,
  ACCOUNT_META_DATA,
  ACCOUNT_TYPE,
} from "../constants/LocalStorageConstants";
import { localStorageGet, localStorageStore } from "./LocalStorageUtils";
import { MenuItemType } from "../types/MenuItem";
import { MenuItems } from "../constants/MenuItemsData";
import { AccountMenuItems } from "../types/AccountMenuItems";
import { getBaseUrl } from "./BaseUrlUtils";
import { NewAccount } from "../types/NewAccount";
import { NewAccountPayload } from "../types/NewAccountPayload";
import { Therapist } from "../types/Therapist";
import { SelectOption } from "../types/SelectOption";

export const retrieveAccountType = async (
  googleId: string
): Promise<string> => {
  const resp: AxiosResponse = await axios.get(
    `${getBaseUrl()}/account/${googleId}/type`
  );
  const accountType: string = resp.data;
  return accountType;
};

export const getAccountTableIdReference = async (
  accountType: string,
  googleId: string
): Promise<number> => {
  const url = `${getBaseUrl()}/account/${accountType}/${googleId}`;
  const resp: AxiosResponse = await axios.get(url);
  return resp.data;
};

export const isActiveAccount = async (googleId: string): Promise<boolean> => {
  console.log("Checking if account is active...");
  const resp = await axios.get(`${getBaseUrl()}/account/${googleId}/active`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  console.log("Account check complete.");
  
  localStorageStore(ACCOUNT_ID, googleId);
  const isActiveAccount: boolean = resp.data;
  return isActiveAccount;
};

export const getAccountTypeMenuItems = (): MenuItemType[] => {
  const accountType: string = localStorageGet(ACCOUNT_TYPE);
  return MenuItems[accountType as keyof AccountMenuItems];
};

export const isTherapist = (): boolean => {
  return localStorageGet(ACCOUNT_TYPE) === "therapist";
};

export const isParent = (): boolean => {
  return localStorageGet(ACCOUNT_TYPE) === "parent";
};

export const isChild = (): boolean => {
  return localStorageGet(ACCOUNT_TYPE) === "child";
};

export const createAccount = async (
  accountData: NewAccount
): Promise<AxiosResponse> => {
  const accountMetaData = localStorageGet(ACCOUNT_META_DATA);
  const payload: NewAccountPayload = {
    accountType: accountData.accountType,
    childsName: accountData.childsName,
    selectedTherapist: accountData.selectedTherapist,
    firstName: accountMetaData.givenName,
    surname: accountMetaData.familyName,
    googleId: localStorageGet(ACCOUNT_ID),
  };
  const url = `${getBaseUrl()}/account/create`;
  var resp: AxiosResponse = await axios.post(url, payload, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return resp;
};

export const getAllTherapists = async (): Promise<Therapist[]> => {
  const url = `${getBaseUrl()}/therapist/all`;
  const resp = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return resp.data;
};

export const createSelectOptionsForTherapist = async (): Promise<
  SelectOption[]
> => {
  const listOfTherapists = await getAllTherapists();
  return listOfTherapists.map((therapist) => {
    return {
      label: `${therapist.firstName} ${therapist.surname}`,
      value: `${therapist.id}`,
    };
  });
};

export const getChildPoints = async (): Promise<number> => {
  const accountId = localStorageGet(ACCOUNT_ID);
  const resp: AxiosResponse<number> = await axios.get(
    `${getBaseUrl()}/account/points/${accountId}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return resp.data;
};
