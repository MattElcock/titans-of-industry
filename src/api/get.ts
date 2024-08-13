import axios from "axios";

export const get = (url: string) => {
  const token = process.env.DISCORD_AUTHORIZATION_TOKEN;

  return axios.get(`https://discord.com/api/v10/${url}`, {
    headers: {
      Authorization: token,
    },
  });
};
