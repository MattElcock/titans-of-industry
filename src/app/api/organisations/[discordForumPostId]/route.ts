import { NextResponse } from "next/server";
import { getChannelById } from "../../_discord/getChannelById";
import { listChannelMessages } from "../../_discord/listChannelMessages";
import { getAllTags } from "../../_helpers/getAllTags";
import {
  extractConnections,
  mapThreadToOrganisation,
} from "../../_helpers/getAllOrganisations";

interface Params {
  discordForumPostId: string;
}

export async function GET(_req: Request, { params }: { params: Params }) {
  try {
    const { discordForumPostId } = params;

    const { data: orgForum } = await getChannelById(discordForumPostId);
    const { data: orgChannel } = await getChannelById(orgForum.parent_id);
    const { data: orgForumMessages } = await listChannelMessages(
      discordForumPostId
    );
    const tags = await getAllTags();

    const organisation = mapThreadToOrganisation(orgForum, [orgChannel], tags);

    const firstPostIndex = orgForumMessages.length - 1;
    const firstMessage = orgForumMessages[firstPostIndex];

    const resp = {
      id: organisation.id,
      name: organisation.name,
      description: firstMessage.content,
      type: organisation.type,
      wantedConnectionsCategories: organisation.wantedConnectionsCategories,
      potentialOffersCategories: organisation.potentialOffersCategories,
    };

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
