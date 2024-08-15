import { discordApiGet } from "./discordApiGet";

export const listChannelMessages = async (id: string) => {
  const resp = await discordApiGet(`channels/${id}/messages`);

  return resp;
};
