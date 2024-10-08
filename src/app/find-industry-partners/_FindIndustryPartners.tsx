"use client";

import { Option, Select } from "@/components/SelectBox";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useOrganisations } from "@/hooks/useOrganisations";
import { useUpdateUrl } from "@/hooks/useUpdateUrl";
import {
  Heading,
  ListItem,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Organisation } from "../api/types";
import { InDemandTable } from "./_InDemandTable";
import { SuppliersTable } from "./_SuppliersTable";

interface FindIndustryPartnersProps {
  allOrganisations: Organisation[];
}

const About = () => {
  return (
    <>
      <Stack spacing={4}>
        <Heading fontSize="lg" as="h2">
          Features
        </Heading>
        <UnorderedList>
          <ListItem>
            <strong>Identify Potential Suppliers</strong>: Discover
            organizations that could serve as suppliers.
          </ListItem>
          <ListItem>
            <strong>Find Demand for Offerings</strong>: Locate organizations
            that may be in need of what another organization offers.
          </ListItem>
        </UnorderedList>
      </Stack>
      <Stack spacing={4}>
        <Heading fontSize="lg" as="h2">
          How Organizations are Matched
        </Heading>
        <Text>
          Organizations are matched based on shared categories, which are
          derived from forum posts within our Discord server. Keep in mind that
          some categories are broad (e.g., &apos;Manufacturing&apos; includes
          anything related to production, such as speeder bikes, starships,
          minerals, and metals). As a result, not all matches may be relevant to
          the selected organization.
        </Text>
      </Stack>
    </>
  );
};

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

  const { isFetching: isGettingSelectedOrg, data: selectedOrg } =
    useOrganisation(selectedOrginsaton!, selectedOrginsaton !== undefined);

  const { isFetching: isFetchingInDemand, data: inDemandData } =
    useOrganisations(
      {
        pagination: { limit: 999, page: 1 },
        filters: {
          type: undefined,
          wantedConnections: selectedOrg?.potentialOffersCategories,
        },
      },
      selectedOrg !== undefined
    );

  const {
    isFetching: isFetchingPotentialSuppliers,
    data: potentialSuppliersData,
  } = useOrganisations(
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

  const potentialSuppliers = potentialSuppliersData?.filter(
    (org) => org.id !== selectedOrg.id
  );

  const inDemand = inDemandData?.filter((org) => org.id !== selectedOrg.id);

  const isFetching =
    isFetchingPotentialSuppliers || isFetchingInDemand || isGettingSelectedOrg;

  return (
    <Stack spacing={7}>
      <Stack spacing={5}>
        <Heading as="h1">Find Industry Partners</Heading>
        <Heading as="h2" fontSize="2xl">
          About this Tool
        </Heading>
        <About />
        <Heading fontSize="2xl" as="h2">
          Potential Industry Partners
        </Heading>
        <Stack spacing={4}>
          <Stack spacing={3}>
            <Heading fontSize="lg" as="h3">
              1. Choose an Organization
            </Heading>
            <Text>
              Choose an organization from our network. This will automatically
              begin searching, with results displayed in the &apos;Results&apos;
              section below.
            </Text>
            <Select
              label="Organization"
              defaultValue={defaultValue}
              options={options}
              onChange={handleOrgChange}
            />
          </Stack>
          <Stack spacing={3}>
            <Heading fontSize="lg" as="h3">
              2. Results
            </Heading>
            <Stack spacing={7}>
              {!selectedOrginsaton && !isFetching && (
                <Text>
                  After you choose an organization, the results will show here.
                </Text>
              )}
              {isFetching && <Spinner color="primary.500" m={3} />}
              {!isFetching && potentialSuppliers && inDemand && (
                <>
                  <InDemandTable
                    selectedOrganisation={selectedOrg}
                    organisations={inDemand}
                  />
                  <SuppliersTable
                    selectedOrganisation={selectedOrg}
                    organisations={potentialSuppliers}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
