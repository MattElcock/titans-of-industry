import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box display="grid" gridTemplateRows="auto 1fr" height="100vh">
      <AppHeader />
      <Box
        as="main"
        padding="1rem 2rem"
        bgImage="linear-gradient(to bottom, #000000, #0f0309, #160714, #190d1d, #171228, #161c35, #112543, #00304f, #00425e, #005567, #00676a, #167869)"
        pt={10}
      >
        {children}
      </Box>
    </Box>
  );
};
