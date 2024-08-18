import { getConfig } from "@/utils/config";
import { NextResponse } from "next/server";
import { getChannelById } from "../_discord/getChannelById";
import { listThreads } from "../_discord/listThreads";

export async function GET() {
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

    const allIndustries = allOrganisations.filter(
      (org) => org.type === "industries"
    );
    const allGovernorships = allOrganisations.filter(
      (org) => org.type === "governorships"
    );
    const allPowerbases = allOrganisations.filter(
      (org) => org.type === "powerbases"
    );

    const total = allOrganisations.length + 1;

    const resp = {
      total,
      industriesCount: allIndustries.length,
      governorshipsCount: allGovernorships.length,
      powerbasesCount: allPowerbases.length,
    };

    return NextResponse.json(resp, {
      status: 200,
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
