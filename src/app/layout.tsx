import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { Box, Container } from "@chakra-ui/react";
import { background } from "./_theme";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GoogleAnalytics />
          <Box display="grid" gridTemplateRows="auto 1fr auto" minH="100vh">
            <Header />
            <Box as="main" bg={background} width="100vw">
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
