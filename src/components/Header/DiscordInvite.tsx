import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { RiDiscordLine } from "react-icons/ri";

export const DiscordInvite = () => {
  return (
    <Link
      href="https://discord.gg/BpbVZaHc9w"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", width: "fit-content" }}
      aria-label="Join our Discord server"
    >
      <Box fontSize={[40, 30]}>
        <RiDiscordLine aria-label="Discord logo" />
      </Box>
    </Link>
  );
};
