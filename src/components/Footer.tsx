import { Box, Container, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { RiCopyrightLine } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";

export const Footer = () => {
  return (
    <Box as="footer" bgColor="#000" color="#E1E1E1">
      <Container maxW="container.xl" padding="1rem 2rem">
        <Stack spacing={3}>
          <Text fontSize="sm">
            <strong>Titans of Industry</strong> is a roleplaying community
            within the massively multiplayer online role-playing game{" "}
            <Link
              href="https://www.swtor.com/"
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "underline" }}
            >
              Star Wars: The Old Republic
            </Link>
          </Text>
          <Box
            display="flex"
            gap={3}
            justifyContent={["space-between", "start"]}
            flexDirection={["column", "row"]}
          >
            <Text fontSize="sm" display="flex" alignItems="center" gap={1}>
              <IoLogoVercel aria-label="Vercel logo" />
              Deployed on
              <Link
                href="https://vercel.com/"
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "underline" }}
              >
                Vercel
              </Link>
            </Text>
            <Text fontSize="sm" display="flex" alignItems="center" gap={1}>
              <RiCopyrightLine aria-label="Copyright" />
              Built by
              <Link
                href="https://www.linkedin.com/in/matthewelcock"
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "underline" }}
              >
                Matthew Elcock
              </Link>
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
