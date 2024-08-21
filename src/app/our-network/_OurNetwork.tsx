"use client";

import { FilterDropdown } from "@/components/FilterDropdown";
import { OrgCard } from "@/components/OrgCard";
import { Pagination } from "@/components/Pagination";
import { useOrganisations } from "@/hooks/useOrganisations";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const OurNetwork = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParam = (name: string): string | undefined => {
    return searchParams.get(name) ? String(searchParams.get(name)) : undefined;
  };

  const page = Number(getQueryParam("page") || 1);
  const type = getQueryParam("type");
  const wantedConnections = getQueryParam("wantedConnections");
  const potentialOffers = getQueryParam("potentialOffers");

  const { isLoading, data, pagination } = useOrganisations({
    pagination: { page },
    filters: { type, wantedConnections, potentialOffers },
  });

  const updateUrl = (params: Record<string, string | undefined>) => {
    const queryString = Object.entries(params)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join("&");

    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleChangePage = (page: number) => {
    const params = {
      page: page.toString(),
      type,
      wantedConnections,
      potentialOffers,
    };

    updateUrl(params);
  };

  const handleTypeChange = (type: string[]) => {
    const params = {
      type: type.length > 0 ? type.toString() : undefined,
      wantedConnections,
      potentialOffers,
    };

    updateUrl(params);
  };

  const handleWantedConnectionsChange = (wantedConnections: string[]) => {
    const params = {
      type,
      wantedConnections:
        wantedConnections.length > 0 ? wantedConnections.toString() : undefined,
      potentialOffers,
    };

    updateUrl(params);
  };

  const handlePotentialOffersChange = (potentialOffers: string[]) => {
    const params = {
      type,
      wantedConnections,
      potentialOffers:
        potentialOffers.length > 0 ? potentialOffers.toString() : undefined,
    };

    updateUrl(params);
  };

  const connectionCategories = [
    "Agriculture",
    "Finance",
    "Entertainment",
    "Health+Wellbeing",
    "Land Development",
    "Logistics",
    "Manufacturing",
    "Military",
    "People",
  ];

  return (
    <Stack spacing={5}>
      <Heading color="#E1E1E1">Our Network</Heading>
      <Box display="flex" gap={5}>
        <FilterDropdown
          label="Type"
          defaultOptions={type ? type.split(",") : undefined}
          options={["Governorships", "Industries", "Powerbases"]}
          onChange={handleTypeChange}
        />
        <FilterDropdown
          label="Wanted Connections"
          defaultOptions={
            wantedConnections ? wantedConnections.split(",") : undefined
          }
          options={connectionCategories}
          onChange={handleWantedConnectionsChange}
        />
        <FilterDropdown
          label="Potential Offers"
          defaultOptions={
            potentialOffers ? potentialOffers.split(",") : undefined
          }
          options={connectionCategories}
          onChange={handlePotentialOffersChange}
        />
      </Box>
      {isLoading || !pagination || !data ? (
        <p>Loading</p>
      ) : (
        <>
          <Stack
            spacing={[5, 10]}
            direction={["column", "row"]}
            flexWrap="wrap"
          >
            {data.map(({ id, name, type }: any) => (
              <OrgCard key={id} name={name} type={type} id={id} />
            ))}
          </Stack>
          <Pagination
            total={pagination.total}
            limit={pagination.limit}
            currentPage={page}
            onChange={handleChangePage}
          />
        </>
      )}
    </Stack>
  );
};
