import axios from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { Resource } from "../types/Resource";

export const fetchAllResources = async (): Promise<Resource[]> => {
  const resp = await axios.get(`${getBaseUrl()}/resources/all`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return resp.data;
};

export const fetchResource = async (resourceId:number):Promise<Resource> => {
  const resp = await axios.get(`${getBaseUrl()}/resources/resource/${resourceId}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return resp.data;
}
