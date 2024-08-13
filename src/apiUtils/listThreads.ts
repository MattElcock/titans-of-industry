import { getConfig } from "./config";
import { get } from "./get";

export const listThreads = async () => {
  const config = getConfig();
  const resp = await get(`/guilds/${config.guildId}/threads/active`);

  return resp;
};
