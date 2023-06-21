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
    return { value: word.id.toString(), label: word.word };
  });
};

export const fetchAllProcesses = async (): Promise<SelectOption[]> => {
  const resp: AxiosResponse<string[]> = await axios.get(
    `${getBaseUrl()}/prescription/words/processes`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.data.map((grouping) => {
    return {
      label: grouping,
      value: grouping,
    };
  });
};

const sanitizeProcessName = (processName: string): string => {
  return processName.replaceAll(" ", "%20");
};

export const fetchAllProcessPresets = async (
  processName: string
): Promise<SelectOption[]> => {
  const sanitizedUrlProcessName = sanitizeProcessName(processName);
  const resp: AxiosResponse<string[]> = await axios.get(
    `${getBaseUrl()}/prescription/words/processes/${sanitizedUrlProcessName}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.data.map((processPresetName) => {
    return {
      label: processPresetName,
      value: processPresetName,
    };
  });
};

export const fetchProcessPreset = async (
  processName: string,
  presetName: string
): Promise<{ first: Word; second: Word }[]> => {
  const sanitizedUrlProcessName = sanitizeProcessName(processName);
  const sanitizedUrlPresetName = sanitizeProcessName(presetName);
  const resp: AxiosResponse<{ first: Word; second: Word }[]> = await axios.get(
    `${getBaseUrl()}/prescription/words/processes/${sanitizedUrlProcessName}/${sanitizedUrlPresetName}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.data;
};
