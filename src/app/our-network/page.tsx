"use client";

import { OrgCard } from "@/components/OrgCard";
import { Pagination } from "@/components/Pagination";
import { useOrganisations } from "@/hooks/useOrganisations";
import { Heading, Stack } from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";

export default function WrappedPage() {
  return (
    <Suspense>
      <OurNetwork />
    </Suspense>
  );
}

function OurNetwork() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, error, data, pagination } = useOrganisations({
    pagination: { page },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data || !pagination || error) {
    if (error) console.error(error);
    return <p>Error</p>;
  }

  const handleChangePage = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  return (
    <Stack spacing={5}>
      <Heading color="#E1E1E1">Our Network</Heading>
      <Stack spacing={[5, 10]} direction={["column", "row"]} flexWrap="wrap">
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
    </Stack>
  );
}
