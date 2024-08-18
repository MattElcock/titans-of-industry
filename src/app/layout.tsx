import { Box, Container, Text } from "@chakra-ui/react";
import { ReactNode, Suspense } from "react";
import { EB_Garamond } from "next/font/google";
import Link from "next/link";

const font = EB_Garamond({
  subsets: ["latin"],
});

import { Providers } from "./providers";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            display="grid"
            gridTemplateRows="auto 1fr auto"
            minHeight="100vh"
          >
            <Box as="header" bgColor="#157868" color="#fff">
              <Container maxW="container.xl" paddingY="0.75rem">
                <Link
                  href="/"
                  style={{ display: "block", width: "fit-content" }}
                >
                  <Box display="flex" gap={3} alignItems="center">
                    <Image src="/logo.png" width={48} height={24} alt="Logo" />
                    <Text
                      fontSize="2xl"
                      className={font.className}
                      lineHeight={1}
                    >
                      <Text fontSize="md" as="span" display="block">
                        TITANS OF
                      </Text>
                      INDUSTRY
                    </Text>
                  </Box>
                </Link>
              </Container>
            </Box>
            <Box as="main" bgColor="#020b17">
              <Container maxW="container.xl" paddingY="1rem">
                <Breadcrumbs />
                {children}
              </Container>
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
