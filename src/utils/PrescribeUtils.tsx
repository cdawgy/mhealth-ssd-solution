import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { SelectOption } from "../types/SelectOption";
import { WordPair } from "../types/WordPair";

const getListOfTherapistPatients = async (): Promise<string[]> => {
  const resp: AxiosResponse = await axios.get(
    `${getBaseUrl()}/therapist/patients`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return resp.data;
};

export const createChildSelectOptions = async (): Promise<SelectOption[]> => {
  const childrenNames = await getListOfTherapistPatients();
  return childrenNames.map((name) => {
    return { value: name, label: name };
  });
};

const getListOfWordPairs = async (): Promise<WordPair[]> => {
  const resp: AxiosResponse = await axios.get(
    `${getBaseUrl()}/game/wordPairs`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return resp.data;
};

export const createWordPairSelectOptions = async (): Promise<
  SelectOption[]
> => {
  const wordPairs = await getListOfWordPairs();
  return wordPairs.map((wordPair) => {
    const wordPairFormatted: string = `${wordPair.firstWord}, ${wordPair.secondWord}`;
    return {
      value: wordPairFormatted,
      label: wordPairFormatted,
    };
  });
};
