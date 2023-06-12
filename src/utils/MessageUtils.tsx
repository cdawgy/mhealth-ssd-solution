import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { SelectOption } from "../types/SelectOption";
import { fetchAllResources } from "./ResourceUtils";
import { Resource } from "../types/Resource";
import { localStorageGet } from "./LocalStorageUtils";
import { LOGGED_IN_TABLE_REFERENCE } from "../constants/LocalStorageConstants";

const getListOfPatientsParentNames = async (): Promise<string[]> => {
  const resp: AxiosResponse = await axios.post(
    `${getBaseUrl()}/therapist/patients/parents`,
    { id: localStorageGet(LOGGED_IN_TABLE_REFERENCE) },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.data;
};

export const createParentNameSelectOptions = async (): Promise<
  SelectOption[]
> => {
  const parentNames: string[] = await getListOfPatientsParentNames();
  return parentNames.map((name) => {
    return { value: name, label: name };
  });
};

export const createResourceSelectOptions = async (): Promise<
  SelectOption[]
> => {
  const resource: Resource[] = await fetchAllResources();
  return resource.map((resource) => {
    return { value: resource.title, label: resource.title };
  });
};
