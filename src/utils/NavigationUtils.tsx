import {
  ACCOUNT_TYPE,
  LOGGED_IN_TABLE_REFERENCE,
} from "../constants/LocalStorageConstants";
import {
  getAccountTableIdReference,
  isActiveAccount,
  retrieveAccountType,
} from "./AccountUtils";
import { localStorageStore } from "./LocalStorageUtils";

export const determineLoginRedirect = async (
  accountId: string
): Promise<string> => {
  let redirectPath = "/NotFound";
  if (await isActiveAccount(accountId)) {
    const accountType: string = await retrieveAccountType(accountId);
    const accountTableIdReference: number = await getAccountTableIdReference(
      accountType,
      accountId
    );
    localStorageStore(ACCOUNT_TYPE, accountType);
    localStorageStore(LOGGED_IN_TABLE_REFERENCE, accountTableIdReference);
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
