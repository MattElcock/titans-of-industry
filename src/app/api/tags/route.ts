import { NextResponse } from "next/server";
import { getAllTags } from "../_helpers/getAllTags";

export async function GET() {
  try {
    const tags = await getAllTags();

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
