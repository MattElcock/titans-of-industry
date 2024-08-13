import { getChannelById } from "@/api/getChannelById";
import { flatMap } from "lodash";
import { NextResponse } from "next/server";

const channelIds = process.env.DISCORD_CHANNELS?.split(",") || [];

export async function GET() {
  if (channelIds.length === 0) {
    return NextResponse.json(
      {
        message: "Error: Cannot find channel IDs to pull tags from.",
      },
      { status: 500 }
    );
  }

  const tags = await Promise.all(
    channelIds.map(async (id: string) => {
      const resp = await getChannelById(id);

      return resp.data.available_tags;
    })
  );

  return NextResponse.json(flatMap(tags), { status: 200 });
}
