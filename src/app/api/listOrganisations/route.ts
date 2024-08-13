import { getConfig } from "@/apiUtils/config";
import { listThreads } from "@/apiUtils/listThreads";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const config = getConfig();
    const resp = await listThreads();

    const filteredThreads = resp.data.threads.filter((thread: any) =>
      config.channelIds.includes(thread.parent_id)
    );

    const organisations = filteredThreads.map((thread: any) => ({
      id: thread.id,
      name: thread.name,
    }));

    return NextResponse.json(organisations, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    } else {
      return NextResponse.json("An unknown error occurred", { status: 500 });
    }
  }
}
