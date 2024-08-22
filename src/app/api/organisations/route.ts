import { flow, sortBy, startCase } from "lodash";
import { NextResponse } from "next/server";
import { getAllOrganisations } from "../_helpers/getAllOrganisations";
import { Organisation } from "../types";

const DEFAULT_LIMIT = 21;

const filterByType = (
  organisations: Organisation[],
  typeParam: string | null
): Organisation[] => {
  if (typeParam === null) {
    return organisations;
  }

  const typesArray = typeParam.split(",");

  const filteredOrganisations = organisations.filter((org) =>
    typesArray.includes(startCase(org.type))
  );

  return filteredOrganisations;
};

const filterByWantedConnections = (
  organisations: Organisation[],
  wantedConnections: string | null
): Organisation[] => {
  if (wantedConnections === null) {
    return organisations;
  }

  const wantedConnectionsArr = wantedConnections.split(",");

  const filteredOrganisations = organisations.filter((org) =>
    org.wantedConnectionsCategories.some((connection) =>
      wantedConnectionsArr.includes(connection)
    )
  );

  return filteredOrganisations;
};

const filterByPotentialOffers = (
  organisations: Organisation[],
  potentialOffers: string | null
): Organisation[] => {
  if (potentialOffers === null) {
    return organisations;
  }

  const potentialOffersArr = potentialOffers.split(",");

  const filteredOrganisations = organisations.filter((org) =>
    org.potentialOffersCategories.some((connection) =>
      potentialOffersArr.includes(connection)
    )
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

    const limit = Number(searchParams.get("limit") || DEFAULT_LIMIT);

    const typeFilter = searchParams.get("type");
    const wantedConnectionsFilter = searchParams.get("wantedConnections");
    const potentialOffers = searchParams.get("potentialOffers");

    const applyFiltering = flow([
      (input) => filterByType(input, typeFilter),
      (input) => filterByWantedConnections(input, wantedConnectionsFilter),
      (input) => filterByPotentialOffers(input, potentialOffers),
    ]);

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
