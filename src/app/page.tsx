import { IconCard } from "@/components/IconCard";
import { commonOpenGraph } from "@/constants";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowRight, Network, PackageSearch } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

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
    <Box
      bgImage="radial-gradient(circle, #157868, #006362, #004d57, #003947, #082533, #0a1d2a, #081520, #020b17, #020b17, #020b17, #020b17, #020b17)"
      width={["100vw", "100%"]}
      height="100%"
      pt={["2rem", "8rem"]}
      marginX={["-1rem", "unset"]}
      paddingX={["1rem", "unset"]}
    >
      <Box mb={[5, 10]}>
        <Heading fontSize={["3xl", "5xl"]} mb={3} as="h1">
          <Text as="span" display="block">
            Collaborate,
          </Text>
          <Text as="span" display="block">
            streamline production,
          </Text>
          and drive the Empire&apos;s victory.
        </Heading>
        <Text fontSize={["sm", "lg"]}>
          <strong>Join Titans of Industry</strong>, a roleplaying community
          uniting the Sith Empire&apos;s industrial leaders on Star Wars: The
          Old Republic&apos;s Darth Malgus server.
        </Text>
      </Box>
      <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap={5}>
        <IconCard
          href="/our-network"
          icon={<Network />}
          heading="Our Network"
          text="Explore the organizations within our network."
        />
        <IconCard
          href="/find-industry-partners"
          icon={<PackageSearch />}
          heading="Find Industry Partners"
          text="Select an organization from within our network and explore their suggested industry partners."
        />
      </Box>
    </Box>
  );
}
