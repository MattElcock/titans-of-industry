import { Box, Container, Text } from "@chakra-ui/react";
import { EB_Garamond } from "next/font/google";
import Image from "next/image";
import { RiDiscordLine, RiGithubLine } from "react-icons/ri";
import Link from "next/link";

const font = EB_Garamond({
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <Link href="/" style={{ display: "block", width: "fit-content" }}>
      <Box display="flex" gap={3} alignItems="center">
        <Image src="/logo.png" width={48} height={24} alt="Logo" />
        <Text fontSize="2xl" className={font.className} lineHeight={1}>
          <Text fontSize="md" as="span" display="block">
            TITANS OF
          </Text>
          INDUSTRY
        </Text>
      </Box>
    </Link>
  );
};

const GitHubLink = () => {
  return (
    <Link
      href="https://github.com/MattElcock/titans-of-industry"
      target="_blank"
      rel="noopener"
      style={{ display: "block", width: "fit-content" }}
      aria-label="View code on GitHub"
    >
      <RiGithubLine fontSize={28} aria-label="GitHub logo" />
    </Link>
  );
};

const DiscordInvite = () => {
  return (
    <Link
      href="https://discord.gg/BpbVZaHc9w"
      target="_blank"
      rel="noopener"
      style={{ display: "block", width: "fit-content" }}
      aria-label="Join our Discord server"
    >
      <RiDiscordLine fontSize={28} aria-label="Discord logo" />
    </Link>
  );
};

export const Header = () => {
  return (
    <Box as="header" bgColor="#157868" color="#fff">
      <Container
        maxW="container.xl"
        paddingY="0.75rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo />
        <Box display="flex" alignItems="center" gap={5}>
          <GitHubLink />
          <DiscordInvite />
        </Box>
      </Container>
    </Box>
  );
};
