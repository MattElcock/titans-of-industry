"use client";

import { OrgCard } from "@/components/OrgCard";
import { Pagination } from "@/components/Pagination";
import { RevealFilters } from "@/components/RevealFilters";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useOrganisations } from "@/hooks/useOrganisations";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { FiltersBar } from "./_FiltersBar";

export const OurNetwork = () => {
  const router = useRouter();
  const pathname = usePathname();
  const getQueryParam = useGetQueryParam();

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

  return (
    <Stack spacing={5}>
      <Heading color="#E1E1E1">Our Network</Heading>
      <Box display={["block", "none"]}>
        <RevealFilters>
          <FiltersBar />
        </RevealFilters>
      </Box>
      <Box display={["none", "block"]}>
        <FiltersBar />
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
