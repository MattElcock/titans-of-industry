import { getConfig } from "@/utils/config";
import { getChannelById } from "../_discord/getChannelById";
import { listThreads } from "../_discord/listThreads";
import { Organisation, Tag } from "../types";
import { getAllTags } from "./getAllTags";

export const extractConnections = (
  connections: string[],
  prefix: "w:" | "o:"
): string[] => {
  return connections
    .filter((connection) => connection.startsWith(prefix))
    .map((connection) => connection.slice(prefix.length).trim());
};

export const mapThreadToOrganisation = (
  thread: any,
  channels: any[],
  tags: Tag[]
): Organisation => {
  const channel = channels.find((channel) => channel.id === thread.parent_id);
  const type = channel?.name;

  const allConnections: string[] = (thread.applied_tags || [])
    .map((threadTag: string) => {
      const tag = tags.find((tag) => tag.id === threadTag);
      return tag?.name;
    })
    .filter(Boolean);

  const wantedConnectionsCategories = extractConnections(allConnections, "w:");
  const potentialOffersCategories = extractConnections(allConnections, "o:");

  return {
    id: thread.id,
    name: thread.name,
    type,
    wantedConnectionsCategories,
    potentialOffersCategories,
  };
};

export const getAllOrganisations = async (): Promise<Organisation[]> => {
  const config = getConfig();
  const { channelIds } = config;

  const channels = await Promise.all(
    channelIds.map(async (channelId) => {
      const response = await getChannelById(channelId);
      return response.data;
    })
  );

  const threads = await listThreads();
  const filteredThreads = threads.filter((thread: any) =>
    channelIds.includes(thread.parent_id)
  );

  const tags = await getAllTags();

  return filteredThreads.map((thread: any) =>
    mapThreadToOrganisation(thread, channels, tags)
  );
};
