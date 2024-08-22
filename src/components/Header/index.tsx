import { Box, Container } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { DiscordInvite } from "./DiscordInvite";
import { Suspense } from "react";

export const Header = () => {
  return (
    <Box as="header">
      <Box bg="primary" color="#fff">
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
            <Suspense>
              <MobileMenu />
            </Suspense>
          </Box>
          <Box
            display={["none", "flex"]}
            justifyContent="space-between"
            gap={5}
          >
            <DesktopMenu />
            <DiscordInvite />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
