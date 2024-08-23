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
import { Organisation } from "../api/types";
import { startCase } from "lodash";

interface Props {
  selectedOrganisation: Organisation;
  organisations: Organisation[];
}

export const SuppliersTable = ({
  selectedOrganisation,
  organisations,
}: Props) => {
  const tableRows = organisations.map((partner) => {
    const helpfulSelectedOrgCategories =
      selectedOrganisation.wantedConnectionsCategories.filter((category) =>
        partner.potentialOffersCategories.includes(category)
      );

    return (
      <Tr
        key={`row-${partner.name}`}
        css={{
          "&:nth-of-type(odd)": {
            backgroundColor: "#081629",
          },
          "&:nth-of-type(even)": {
            backgroundColor: "#04152f",
          },
        }}
      >
        <Td textDecoration="underline" fontWeight="bold">
          <Link
            href={`/our-network/${partner.id}`}
            target="_blank"
            rel="noopener"
          >
            {partner.name}
          </Link>
        </Td>
        <Td>{startCase(partner.type)}</Td>
        <Td>{helpfulSelectedOrgCategories.join(", ")}</Td>
      </Tr>
    );
  });
  return (
    <Stack spacing={2}>
      <Heading fontSize="md" as="h4">
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
            <Th color="text">Type</Th>
            <Th color="text">Matched Categories</Th>
          </Thead>
          <Tbody>{tableRows}</Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
