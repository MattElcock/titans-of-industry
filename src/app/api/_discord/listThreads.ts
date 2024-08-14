import { getConfig } from "@/utils/config";
import { flatMap } from "lodash";
import { discordApiGet } from "./discordApiGet";

export const listThreads = async () => {
  const config = getConfig();
  const activeThreads = await discordApiGet(
    `/guilds/${config.guildId}/threads/active`
  );
  const archivedThreads = await Promise.all(
    config.channelIds.map(async (id) => {
      const resp = await discordApiGet(
        `/channels/${id}/threads/archived/public`
      );
      return resp.data.threads;
    })
  );

  const allThreads = flatMap([
    ...activeThreads.data.threads,
    ...archivedThreads,
  ]);

  return allThreads;
};
