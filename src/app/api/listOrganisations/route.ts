import { config } from "@/apiUtils/config";
import { listThreads } from "@/apiUtils/listThreads";
import { NextResponse } from "next/server";

export async function GET() {
  const resp = await listThreads();

  const filteredThreads = resp.data.threads.filter((thread: any) =>
    config.channelIds.includes(thread.parent_id)
  );

  const organisations = filteredThreads.map((thread: any) => ({
    id: thread.id,
    name: thread.name,
  }));

  return NextResponse.json(organisations, { status: 200 });
}
