import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "../../utils/BaseUrlUtils";
import { Prescription } from "../../types/Prescription";

export const getListOfPrescriptions = async (parentId: string):Promise<Prescription[]> => {
  const resp: AxiosResponse<Prescription[]> = await axios.get(
    `${getBaseUrl()}/prescription/prescriptions/${parentId}`
  );

  return resp.data;
};
