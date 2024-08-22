import {
  TableContainer,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Table,
  Box,
  Heading,
  Stack,
} from "@chakra-ui/react";

interface Organisation {
  name: string;
  wantedConnectionsCategories: string[];
  potentialOffersCategories: string[];
}

interface Props {
  selectedOrganisation: Organisation;
  organisations: Organisation[];
}

export const OrgsThatCanHelpSelected = ({
  selectedOrganisation,
  organisations,
}: Props) => {
  const tableRows = organisations.map((partner) => {
    const helpfulSelectedOrgCategories =
      selectedOrganisation.wantedConnectionsCategories.filter((category) =>
        partner.potentialOffersCategories.includes(category)
      );

    return (
      <Tr key={`row-${partner.name}`}>
        <Td>{partner.name}</Td>
        <Td>{helpfulSelectedOrgCategories.join(", ")}</Td>
      </Tr>
    );
  });
  return (
    <Stack spacing={3}>
      <Heading fontSize="xl">
        Organizations that could supply {selectedOrganisation.name}:
      </Heading>
      <TableContainer>
        <Table
          variant="simple"
          size="sm"
          color="text"
          width={["100%", "40rem"]}
        >
          <Thead>
            <Th color="text" width="20rem">
              Name
            </Th>
            <Th color="text">Matched Categories</Th>
          </Thead>
          <Tbody>{tableRows}</Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
