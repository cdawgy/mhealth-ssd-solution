import { isActiveAccount, retrieveAccountType } from "./AccountUtils";

export const determineLoginRedirect = async (accountId: string):Promise<string> => {
  let redirectPath = "/NotFound";
    if (await isActiveAccount(accountId)) {
      const accountType: string = await retrieveAccountType(accountId);
      if (accountType === "parent") {
        redirectPath = "/whoIsIt";
      } else {
        redirectPath = "/appMainMenu";
      }
    } else {
      redirectPath = "/createAccount"
    }
    return redirectPath;
}