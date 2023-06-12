import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { localStorageGet } from "./LocalStorageUtils";
import {
  ACCOUNT_ID,
  LOGGED_IN_TABLE_REFERENCE,
} from "../constants/LocalStorageConstants";
import { tableRowColours } from "../types/TableRowColours";
import { Award } from "../types/Award";

export const fetchAwards = async (): Promise<Map<string, Award[]>> => {
  const resp = await axios.post(
    `${getBaseUrl()}/account/awards`,
    {
      id: localStorageGet(LOGGED_IN_TABLE_REFERENCE),
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return resp.data;
};

// TODO: Add in the parents accound ID to post request so it can be tethered to the account
export const createAward = async (
  awardTitle: string,
  awardPoints: number
): Promise<number> => {
  const resp: AxiosResponse = await axios.post(
    `${getBaseUrl()}/account/awards/create`,
    {
      parentId: localStorageGet(LOGGED_IN_TABLE_REFERENCE),
      cost: awardPoints,
      title: awardTitle,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.status;
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
