import { getConfig } from "@/utils/config";
import { getChannelById } from "../_discord/getChannelById";
import { listThreads } from "../_discord/listThreads";
import { Organisation } from "../types";

export const getAllOrganisations = async (): Promise<Organisation[]> => {
  const config = getConfig();

  const channels = await Promise.all(
    config.channelIds.map(async (channelId) => {
      const response = await getChannelById(channelId);
      return response.data;
    })
  );

  const threads = await listThreads();

  const filteredThreads = threads.filter((thread: any) =>
    config.channelIds.includes(thread.parent_id)
  );

  const allOrganisations = filteredThreads.map((thread: any) => ({
    id: thread.id,
    name: thread.name,
    type: channels.find((channel) => channel.id === thread.parent_id)?.name,
  }));

  return allOrganisations;
};
