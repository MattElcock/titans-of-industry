import { config } from "@/apiUtils/config";
import { getChannelById } from "@/apiUtils/getChannelById";
import { flatMap } from "lodash";
import { NextResponse } from "next/server";

export async function GET() {
  const apiTags = await Promise.all(
    config.channelIds.map(async (id: string) => {
      const resp = await getChannelById(id);

      return resp.data.available_tags;
    })
  );

  const tags = flatMap(apiTags).map((tag) => ({ id: tag.id, name: tag.name }));

  return NextResponse.json(tags, { status: 200 });
}
