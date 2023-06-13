import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { SelectOption } from "../types/SelectOption";
import { fetchAllResources } from "./ResourceUtils";
import { Resource } from "../types/Resource";
import { localStorageGet } from "./LocalStorageUtils";
import { LOGGED_IN_TABLE_REFERENCE } from "../constants/LocalStorageConstants";
import { Parent } from "../types/Parent";
import { MessageForm } from "../types/MessageForm";
import { MessageType } from "../types/MessageType";

const getListOfPatientsParentNames = async (): Promise<Parent[]> => {
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
  const parentNames: Parent[] = await getListOfPatientsParentNames();
  return parentNames.map((parent) => {
    return {
      value: parent.id.toString(),
      label: `${parent.firstName} ${parent.surname}`,
    };
  });
};

export const createResourceSelectOptions = async (): Promise<
  SelectOption[]
> => {
  const resource: Resource[] = await fetchAllResources();
  return resource.map((resource) => {
    return { value: resource.id.toString(), label: resource.title };
  });
};

export const postMessageToServer = async (
  message: MessageForm
): Promise<void> => {
  await axios.post(`${getBaseUrl()}/message/new`, message, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const getAllMessagesForUser = async (): Promise<MessageType[]> => {
  const accountId = localStorageGet(LOGGED_IN_TABLE_REFERENCE);
  const resp: AxiosResponse = await axios.get(
    `${getBaseUrl()}/message/user/${accountId}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.data;
};

export const setMessageReadStatus = async (messageId:number) => {
  await axios.get(
    `${getBaseUrl()}/message/read/${messageId}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
