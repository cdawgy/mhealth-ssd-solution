import axios from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { localStorageGet } from "./LocalStorageUtils";
import { ACCOUNT_ID } from "../constants/LocalStorageConstants";
import { GroupedAwards } from "../types/GroupedAwards";
import { tableRowColours } from "../types/TableRowColours";

export const fetchAwards = async (): Promise<GroupedAwards> => {
  const resp = await axios.post(
    `${getBaseUrl()}/account/awards`,
    {
      googleId: localStorageGet(ACCOUNT_ID),
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );  
  return resp.data;
};

export const determineRowColours = (awardCost: number): tableRowColours => {
  switch (awardCost) {
    case 7:
      return { primaryColour: "#FA93FC", secondaryColour: "#BA6EBC" };
    case 5:
      return { primaryColour: "#34E1FA", secondaryColour: "#63BCFC" };
    case 3:
      return { primaryColour: "#34FA4B", secondaryColour: "#26AA35" };
    default:
      return { primaryColour: "#FA93FC", secondaryColour: "#BA6EBC" };
  }
};
