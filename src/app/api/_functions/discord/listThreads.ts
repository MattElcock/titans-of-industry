import { getConfig } from "@/utils/config";
import { flatMap } from "lodash";
import { apiGet } from "../apiGet";

export const listThreads = async () => {
  const config = getConfig();
  const activeThreads = await apiGet(
    `/guilds/${config.guildId}/threads/active`
  );
  const archivedThreads = await Promise.all(
    config.channelIds.map(async (id) => {
      const resp = await apiGet(`/channels/${id}/threads/archived/public`);
      return resp.data.threads;
    })
  );

  const allThreads = flatMap([
    ...activeThreads.data.threads,
    ...archivedThreads,
  ]);

  return allThreads;
};
