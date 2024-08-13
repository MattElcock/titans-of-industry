import axios from "axios";
import { config } from "./config";

export const get = (url: string) => {
  return axios.get(`https://discord.com/api/v10/${url}`, {
    headers: {
      Authorization: config.authToken,
    },
  });
};
