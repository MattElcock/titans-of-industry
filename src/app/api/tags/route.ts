import { getConfig } from "@/utils/config";
import { flatMap } from "lodash";
import { NextResponse } from "next/server";
import { getChannelById } from "../_functions/getChannelById";

export async function GET() {
  try {
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

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    } else {
      return NextResponse.json("An unknown error occurred", { status: 500 });
    }
  }
}
