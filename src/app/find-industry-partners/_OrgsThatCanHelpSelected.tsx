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
import Link from "next/link";

interface Organisation {
  id: string;
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
        <Td textDecoration="underline">
          <Link
            href={`/our-network/${partner.id}`}
            target="_blank"
            rel="noopener"
          >
            {partner.name}
          </Link>
        </Td>
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
          variant="striped"
          colorScheme="tertiary"
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
