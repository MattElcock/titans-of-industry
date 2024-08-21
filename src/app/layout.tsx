import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { Box, Container } from "@chakra-ui/react";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box display="grid" gridTemplateRows="auto 1fr auto" minH="100vh">
            <Header />
            <Box as="main" bgColor="#020b17">
              <Container
                maxW="container.xl"
                paddingY="1rem"
                height="100%"
                pb={10}
              >
                <Breadcrumbs />
                {children}
              </Container>
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
