import { getConfig } from "@/utils/config";
import { flatMap } from "lodash";
import { getChannelById } from "../_discord/getChannelById";
import { Tag } from "../types";

export const getAllTags = async (): Promise<Tag[]> => {
  const config = getConfig();

  const apiTags = await Promise.all(
    config.channelIds.map(async (id: string) => {
      const resp = await getChannelById(id);

      return resp.data.available_tags;
    })
  );

  const tags = flatMap(apiTags).map((tag) => ({
    id: tag.id,
    name: tag.name,
  }));

  return tags;
};
