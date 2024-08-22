"use client";

import { Option, Select } from "@/components/SelectBox";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useUpdateUrl } from "@/hooks/useUpdateUrl";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Organisation } from "../api/types";

interface FindIndustryPartnersProps {
  allOrganisations: Organisation[];
}

export const FindIndustryPartners = ({
  allOrganisations,
}: FindIndustryPartnersProps) => {
  const updateUrl = useUpdateUrl();
  const getQueryParam = useGetQueryParam();

  const options = allOrganisations.map((org) => ({
    label: org.name,
    value: org.id,
  }));

  const selectedOrginsaton = getQueryParam("organisation");
  const defaultValue = options.find((org) => org.value === selectedOrginsaton);

  const handleOrgChange = (organisation: Option | null) => {
    const params = {
      organisation: organisation ? organisation.value : undefined,
    };

    updateUrl(params);
  };

  return (
    <Box>
      <Heading mb={3}>Find Industry Partners</Heading>
      <Box width={["100%", "30rem"]}>
        <Stack spacing={2}>
          <Text>Choose an Organization</Text>
          <Select
            defaultValue={defaultValue}
            options={options}
            onChange={handleOrgChange}
          />
        </Stack>
      </Box>
    </Box>
  );
};
