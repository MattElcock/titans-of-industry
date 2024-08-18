import { IconCard } from "@/components/IconCard";
import { NetworkStatistics } from "@/components/NetworkStatistics";
import { Stack } from "@chakra-ui/react";
import { Network, PackageSearch } from "lucide-react";

export default function Home() {
  return (
    <Stack spacing={[8, 14]} pt={[0, 5]} paddingX={[0, "6rem"]}>
      <Stack
        spacing={[5, 20]}
        direction={["column", "row"]}
        justifyContent={["start", "center"]}
      >
        <IconCard
          href="#"
          icon={<PackageSearch />}
          heading="Find a Supply Chain"
          text="Enter an organization's details and discover potential supply
            chain opportunities."
        />
        <IconCard
          href="/our-network"
          icon={<Network />}
          heading="Our Network"
          text="View and connect with the organizations within our network."
        />
      </Stack>
      <NetworkStatistics />
    </Stack>
  );
}
