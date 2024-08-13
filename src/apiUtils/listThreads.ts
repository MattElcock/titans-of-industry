import { config } from "./config";
import { get } from "./get";

export const listThreads = async () => {
  const resp = await get(`/guilds/${config.guildId}/threads/active`);

  return resp;
};
