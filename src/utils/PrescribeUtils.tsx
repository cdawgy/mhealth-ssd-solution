import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { SelectOption } from "../types/SelectOption";
import { WordPair } from "../types/WordPair";
import { localStorageGet } from "./LocalStorageUtils";
import { LOGGED_IN_TABLE_REFERENCE } from "../constants/LocalStorageConstants";
import { Child } from "../types/Child";
import { Prescription } from "../types/Prescription";

const getListOfTherapistPatients = async (): Promise<Child[]> => {
  const resp: AxiosResponse = await axios.post(
    `${getBaseUrl()}/therapist/patients`,
    { id: localStorageGet(LOGGED_IN_TABLE_REFERENCE) },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return resp.data;
};

export const createChildSelectOptions = async (): Promise<SelectOption[]> => {
  const therapistChildPatients = await getListOfTherapistPatients();
  return therapistChildPatients.map((child) => {
    return { value: child.parentId.toString(), label: child.firstName };
  });
};

export const sendPrescriptionToDatabase = async (
  prescription: Prescription
): Promise<number> => {
  const resp: AxiosResponse = await axios.post(
    `${getBaseUrl()}/prescription/prescribe`,
    prescription,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return resp.status;
};
