import axios, { AxiosResponse } from "axios";
import { getBaseUrl } from "../../utils/BaseUrlUtils";
import { WordPairs } from "../../types/WordPair";

export const fetchAllWordPairs = async (
  wordPairIdsPrescription: string
): Promise<WordPairs[]> => {
  const resp: AxiosResponse<WordPairs[]> = await axios.get(
    `${getBaseUrl()}/prescription/words/${wordPairIdsPrescription}`
  );
  return resp.data;
};
