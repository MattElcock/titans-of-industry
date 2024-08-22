"use client";

import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useUpdateUrl } from "@/hooks/useUpdateUrl";
import {
  Box,
  Heading,
  ListItem,
  Stack,
  TableContainer,
  Text,
  UnorderedList,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Table,
} from "@chakra-ui/react";
import { Organisation } from "../api/types";
import { Select, Option } from "@/components/SelectBox";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useOrganisations } from "@/hooks/useOrganisations";
import { SelectedOrgCanHelpWith } from "./_SelectedOrgCanHelpWith";
import { OrgsThatCanHelpSelected } from "./_OrgsThatCanHelpSelected";

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

  const { data: selectedOrg } = useOrganisation(
    selectedOrginsaton!,
    selectedOrginsaton !== undefined
  );

  const { data: selectedOrgCanHelpWithData } = useOrganisations(
    {
      pagination: { limit: 999, page: 1 },
      filters: {
        type: undefined,
        wantedConnections: selectedOrg?.potentialOffersCategories,
      },
    },
    selectedOrg !== undefined
  );

  const { data: orgsThatCanHelpSelectedData } = useOrganisations(
    {
      pagination: { limit: 999, page: 1 },
      filters: {
        type: undefined,
        potentialOffers: selectedOrg?.wantedConnectionsCategories,
      },
    },
    selectedOrg !== undefined
  );

  const handleOrgChange = (organisation: Option | null) => {
    const params = {
      organisation: organisation ? organisation.value : undefined,
    };

    updateUrl(params);
  };

  return (
    <Stack spacing={7}>
      <Heading>Find Industry Partners</Heading>
      <Stack spacing={2} width={["100%", "30rem"]}>
        <Text>Choose an Organization</Text>
        <Select
          defaultValue={defaultValue}
          options={options}
          onChange={handleOrgChange}
        />
      </Stack>
      <Stack spacing={7}>
        {selectedOrgCanHelpWithData && (
          <SelectedOrgCanHelpWith
            selectedOrganisation={selectedOrg}
            organisations={selectedOrgCanHelpWithData.filter(
              (org: any) => org.id !== selectedOrg.id
            )}
          />
        )}
        {orgsThatCanHelpSelectedData && (
          <OrgsThatCanHelpSelected
            selectedOrganisation={selectedOrg}
            organisations={orgsThatCanHelpSelectedData.filter(
              (org: any) => org.id !== selectedOrg.id
            )}
          />
        )}
      </Stack>
    </Stack>
  );
};
