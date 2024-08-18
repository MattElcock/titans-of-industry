"use client";

import { OrgCard } from "@/components/OrgCard";
import { useOrganisations } from "@/hooks/useOrganisations";
import { Box, Heading, Stack } from "@chakra-ui/react";

export default function OurNetwork() {
  const { isLoading, error, data } = useOrganisations();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data || error) {
    if (error) console.error(error);
    return <p>Error</p>;
  }

  return (
    <Box>
      <Heading color="#E1E1E1" pb={5}>
        Our Network
      </Heading>
      <Stack spacing={[5, 10]} direction={["column", "row"]} flexWrap="wrap">
        {data.map(({ id, name, type }: any) => (
          <OrgCard key={id} name={name} type={type} id={id} />
        ))}
      </Stack>
    </Box>
  );
}
