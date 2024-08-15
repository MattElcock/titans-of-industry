import { NextResponse } from "next/server";
import { getChannelById } from "../../_discord/getChannelById";
import { listChannelMessages } from "../../_discord/listChannelMessages";

interface Params {
  discordForumPostId: string;
}

export async function GET(_req: Request, { params }: { params: Params }) {
  try {
    const { discordForumPostId } = params;

    const { data: orgForum } = await getChannelById(discordForumPostId);
    const { data: orgForumMessages } = await listChannelMessages(
      discordForumPostId
    );

    const firstPostIndex = orgForumMessages.length - 1;
    const firstMessage = orgForumMessages[firstPostIndex];

    const resp = { name: orgForum.name, description: firstMessage.content };

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    } else {
      return NextResponse.json("An unknown error occurred", { status: 500 });
    }
  }
}
