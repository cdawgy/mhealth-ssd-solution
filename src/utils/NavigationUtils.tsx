import { ACCOUNT_TYPE } from "../constants/LocalStorageConstants";
import { isActiveAccount, retrieveAccountType } from "./AccountUtils";
import { localStorageStore } from "./LocalStorageUtils";

export const determineLoginRedirect = async (
  accountId: string
): Promise<string> => {
  let redirectPath = "/NotFound";
  if (await isActiveAccount(accountId)) {
    const accountType: string = await retrieveAccountType(accountId);
    localStorageStore(ACCOUNT_TYPE, accountType);
    if (accountType === "parent") {
      redirectPath = "/whoIsIt";
    } else {
      redirectPath = "/appMainMenu";
    }
  } else {
    redirectPath = "/createAccount";
  }
  return redirectPath;
};
