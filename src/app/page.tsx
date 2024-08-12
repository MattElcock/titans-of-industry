import { IconCard } from "@/components/IconCard";
import { Stack } from "@chakra-ui/react";
import { Network, PackageSearch } from "lucide-react";

export default function Home() {
  return (
    <Stack spacing={5} direction={["column", "row"]}>
      <IconCard
        icon={<PackageSearch />}
        heading="Find a Supply Chain"
        text="Enter an organization's details and discover potential supply
            chain opportunities."
      />
      <IconCard
        icon={<Network />}
        heading="Our Network"
        text="View and connect with the organizations within our network."
      />
    </Stack>
  );
}
