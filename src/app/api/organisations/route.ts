import { getConfig } from "@/utils/config";
import { sortBy } from "lodash";
import { NextResponse } from "next/server";
import { getChannelById } from "../_discord/getChannelById";
import { listThreads } from "../_discord/listThreads";

const limit = 15;

export async function GET(req: Request) {
  try {
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

    const sortedOrganisations = sortBy(allOrganisations, "name");

    // Apply pagination
    const { searchParams } = new URL(req.url);
    const currentPage = Number(searchParams.get("page")) || 1;
    const startIndex = (currentPage - 1) * limit;

    const limitedOrganisations = sortedOrganisations.slice(
      startIndex,
      startIndex + limit
    );

    return NextResponse.json(limitedOrganisations, {
      status: 200,
      headers: {
        "x-total": allOrganisations.length.toString(),
        "x-limit": limit.toString(),
      },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    } else {
      return NextResponse.json("An unknown error occurred", { status: 500 });
    }
  }
}
