import {
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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

export const SelectedOrgCanHelpWith = ({
  selectedOrganisation,
  organisations,
}: Props) => {
  const tableRows = organisations.map((partner) => {
    const helpfulSelectedOrgCategories =
      selectedOrganisation.potentialOffersCategories.filter((category) =>
        partner.wantedConnectionsCategories.includes(category)
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
        Organizations where {selectedOrganisation.name} are in demand:
      </Heading>
      <TableContainer>
        <Table
          variant="simple"
          size="sm"
          color="text"
          width={["100%", "40rem"]}
          overflow="scroll"
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
