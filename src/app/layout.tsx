import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Box, Container } from "@chakra-ui/react";
import { background } from "./_theme";
import { Providers } from "./providers";
import { GoogleTagManager } from "@next/third-parties/google";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="2aMRDzl58CR9m4SMhKekC6c2GL7V-7tNO3zJaxLUIl0"
        />
      </Head>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body>
        <Providers>
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
