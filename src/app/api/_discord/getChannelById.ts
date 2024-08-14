import { discordApiGet } from "./discordApiGet";

export const getChannelById = async (id: string) => {
  const resp = await discordApiGet(`channels/${id}`);

  return resp;
};
