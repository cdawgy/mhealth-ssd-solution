import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { SelectOption } from "../types/SelectOption";
import { Word } from "../types/Word";

export const fetchAllGroupings = async (): Promise<SelectOption[]> => {
  const resp: AxiosResponse<string[]> = await axios.get(
    `${getBaseUrl()}/prescription/words/groups`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.data.map((grouping) => {
    return grouping === "All"
      ? {
          label: `${grouping}`,
          value: grouping,
        }
      : {
          label: `/${grouping}/`,
          value: grouping,
        };
  });
};

export const fetchAllGroupedWords = async (
  grouping: string
): Promise<SelectOption[]> => {
  const resp: AxiosResponse<Word[]> = await axios.get(
    `${getBaseUrl()}/prescription/words/group/${grouping}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.data.map((word) => {
    return { value: word.word, label: word.word };
  });
};
