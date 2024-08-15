import { NextResponse } from "next/server";
import { getUserById } from "../../_discord/getUserById";

interface Params {
  id: string;
}

export async function GET(_req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const { data: user } = await getUserById(id);

    return NextResponse.json(
      { id: user.id, username: user.username },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    } else {
      return NextResponse.json("An unknown error occurred", { status: 500 });
    }
  }
}
