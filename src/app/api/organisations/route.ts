import { flow, sortBy, startCase } from "lodash";
import { NextResponse } from "next/server";
import { getAllOrganisations } from "../_helpers/getAllOrganisations";
import { Organisation } from "../types";

const limit = 21;

const filterByType = (
  organisations: Organisation[],
  typeParam: string | null
): Organisation[] => {
  if (typeParam === null) {
    return organisations;
  }

  const typesArray = typeParam ? typeParam.split(",") : undefined;

  const filteredOrganisations = organisations.filter((org) =>
    typesArray ? typesArray.includes(startCase(org.type)) : true
  );

  return filteredOrganisations;
};

export async function GET(req: Request) {
  try {
    const allOrganisations = await getAllOrganisations();

    // Apply sorting
    const sortedOrganisations = sortBy(allOrganisations, "name");

    // Apply filtering
    const { searchParams } = new URL(req.url);

    const typeFilter = searchParams.get("type");

    const applyFiltering = flow([(input) => filterByType(input, typeFilter)]);

    const filteredOrganisations = applyFiltering(sortedOrganisations);

    // Apply pagination
    const currentPage = Number(searchParams.get("page")) || 1;
    const startIndex = (currentPage - 1) * limit;

    const limitedOrganisations = filteredOrganisations.slice(
      startIndex,
      startIndex + limit
    );

    return NextResponse.json(limitedOrganisations, {
      status: 200,
      headers: {
        "x-total": filteredOrganisations.length.toString(),
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
