import { getConfig } from "@/apiUtils/config";
import { OrgCard } from "@/components/OrgCard";
import { Box, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";

export default async function OurNetwork() {
  const config = getConfig();
  const { data: organisations } = await axios.get(
    `${config.apiUrl}/organisations`
  );

  return (
    <Box>
      <Heading color="#fff" pb={5}>
        Our Network
      </Heading>
      <Stack spacing={[5, 10]} direction={["column", "row"]} flexWrap="wrap">
        {organisations.map(({ id, name, type }: any) => (
          <OrgCard key={id} name={name} type={type} />
        ))}
      </Stack>
    </Box>
  );
}
