import { IconCard } from "@/components/IconCard";
import { NetworkStatistics } from "@/components/NetworkStatistics";
import { commonOpenGraph } from "@/constants";
import { Stack } from "@chakra-ui/react";
import { Network, PackageSearch } from "lucide-react";
import { Metadata } from "next";

const pageTitle = "Home | Titans of Industry";
const pageDescription =
  "Titans of Industry brings together the Sith Empire's industrial powerhouses in a Star Wars: The Old Republic roleplaying community. Collaborate, streamline production, and immerse yourself in supporting the Empire's victory.";

export const metadata: Metadata = {
  title: "Home | Titans of Industry",
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://titans-of-industry.vercel.app/",
    ...commonOpenGraph,
  },
};

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
