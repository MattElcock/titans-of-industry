import { flatMap } from "lodash";
import { getConfig } from "./config";
import { get } from "./get";

export const listThreads = async () => {
  const config = getConfig();
  const activeThreads = await get(`/guilds/${config.guildId}/threads/active`);
  const archivedThreads = await Promise.all(
    config.channelIds.map(async (id) => {
      const resp = await get(`/channels/${id}/threads/archived/public`);
      return resp.data.threads;
    })
  );

  const allThreads = flatMap([
    ...activeThreads.data.threads,
    ...archivedThreads,
  ]);

  return allThreads;
};
