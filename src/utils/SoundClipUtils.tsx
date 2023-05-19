import axios from "axios";
import { getBaseUrl } from "./BaseUrlUtils";
import { SoundClip } from "../types/SoundClip";

export const fetchAllSoundClips = async (): Promise<SoundClip[]> => {
  const resp = await axios.get(`${getBaseUrl()}/soundClips/all`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return resp.data;
};

export const fetchSoundClip = async (
  soundClipId: string
): Promise<SoundClip> => {
  const resp = await axios.get(
    `${getBaseUrl()}/soundClips/clip/${soundClipId}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return resp.data;
};
