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

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const type = searchParams.get("type")
    ? String(searchParams.get("type"))
    : undefined;

  const { isLoading, error, data, pagination } = useOrganisations({
    pagination: { page },
    filters: { type },
  });

  const updateUrl = (params: string[]) => {
    router.push(
      `${pathname}${params.length > 0 ? `?${params.join("&")}` : ""}`
    );
  };

  const handleChangePage = (page: number) => {
    const type = searchParams.get("type");
    const params = [`page=${page}`, ...(type ? [`type=${type}`] : [])];

    updateUrl(params);
  };

  const handleTypeChange = (type: string[]) => {
    const params = [...(type.length > 0 ? [`type=${type}`] : [])];

    updateUrl(params);
  };

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
