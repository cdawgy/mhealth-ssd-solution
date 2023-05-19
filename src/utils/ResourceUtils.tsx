import axios from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { Resource } from "../types/Resource";

export const fetchAllResources = async (): Promise<Resource[]> => {
  const resp = await axios.get(`${getBaseUrl()}/resource/all`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return resp.data;
};
