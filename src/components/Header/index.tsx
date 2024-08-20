import { Box, Container } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { DiscordInvite } from "./DiscordInvite";

export const Header = () => {
  return (
    <Box as="header">
      <Box bgColor="#157868" color="#fff">
        <Container
          maxW="container.xl"
          paddingY="0.75rem"
          display="flex"
          justifyContent="space-between"
          gap={[null, "3rem"]}
          alignItems="center"
        >
          <Logo />
          <Box display={["block", "none"]}>
            <MobileMenu />
          </Box>
          <Box display={["none", "Block"]}>
            <DiscordInvite />
          </Box>
        </Container>
      </Box>
      <Box display={["none", "Block"]} bgColor="#020b17" color="#E1E1E1" pt={2}>
        <DesktopMenu />
      </Box>
    </Box>
  );
};
