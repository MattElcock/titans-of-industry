"use client";

import { OrgCard, OrgCardLoadingState } from "@/components/OrgCard";
import { Pagination } from "@/components/Pagination";
import { RevealFilters } from "@/components/RevealFilters";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useOrganisations } from "@/hooks/useOrganisations";
import { useUpdateUrl } from "@/hooks/useUpdateUrl";
import {
  Box,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FiltersBar } from "./_FiltersBar";

export const OurNetwork = () => {
  const getQueryParam = useGetQueryParam();
  const updateUrl = useUpdateUrl();

  const page = Number(getQueryParam("page") || 1);
  const type = getQueryParam("type");
  const wantedConnections = getQueryParam("wantedConnections");
  const potentialOffers = getQueryParam("potentialOffers");

  const { isLoading, data, pagination } = useOrganisations({
    pagination: { page },
    filters: { type, wantedConnections, potentialOffers },
  });

  const handleChangePage = (page: number) => {
    const params = {
      page: page.toString(),
      type,
      wantedConnections,
      potentialOffers,
    };

    updateUrl(params);
  };

  const totalFiltersApplied = [
    ...(type?.split(",") || []),
    ...(wantedConnections?.split(",") || []),
    ...(potentialOffers?.split(",") || []),
  ].length;

  return (
    <Stack spacing={10}>
      <Stack spacing={5}>
        <Heading as="h1">Our Network</Heading>
        <Box display={["block", "none"]}>
          <RevealFilters totalAppliedFilters={totalFiltersApplied}>
            <FiltersBar />
          </RevealFilters>
        </Box>
        <Box display={["none", "block"]}>
          <FiltersBar />
        </Box>
      </Stack>
      {isLoading || !pagination || !data ? (
        <Box
          display="grid"
          gridTemplateColumns={["1fr", "repeat(3, 1fr)"]}
          gap={5}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <OrgCardLoadingState key={`org-loading-${i}`} />
          ))}
        </Box>
      ) : (
        <>
          {data.length !== 0 ? (
            <>
              <UnorderedList
                display="grid"
                gridTemplateColumns={["1fr", "repeat(3, 1fr)"]}
                gap={5}
                styleType="none"
              >
                {data.map(({ id, name, type }: any) => (
                  <ListItem>
                    <OrgCard key={id} name={name} type={type} id={id} />
                  </ListItem>
                ))}
              </UnorderedList>
              <Pagination
                total={pagination.total}
                limit={pagination.limit}
                currentPage={page}
                onChange={handleChangePage}
              />
            </>
          ) : (
            <Text>
              No organizations found. Please adjust your filters and try again.
            </Text>
          )}
        </>
      )}
    </Stack>
  );
};
