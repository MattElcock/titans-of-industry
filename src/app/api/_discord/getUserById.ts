import { discordApiGet } from "./discordApiGet";

export const getUserById = async (id: string) => {
  const resp = await discordApiGet(`users/${id}`);

  return resp;
};
