import axios from "axios";
import { getConfig } from "./config";

export const get = (url: string) => {
  const config = getConfig();
  return axios.get(`https://discord.com/api/v10/${url}`, {
    headers: {
      Authorization: config.authToken,
    },
  });
};
