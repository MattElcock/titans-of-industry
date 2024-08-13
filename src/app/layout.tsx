import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { EB_Garamond } from "next/font/google";

const font = EB_Garamond({
  subsets: ["latin"],
});

interface AppLayoutProps {
  children: ReactNode;
}
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
          <Box
            display="grid"
            gridTemplateRows={["10rem 1fr auto", "13rem 1fr auto"]}
            minHeight="100vh"
          >
            <Box
              as="header"
              padding="2rem"
              bgImage={[
                "linear-gradient(173deg, rgba(22,120,105,1) 0%, rgba(5,25,55,1) 75%)",
                "linear-gradient(175deg, rgba(22,120,105,1) 0%, rgba(5,25,55,1) 50%)",
              ]}
              color="#fff"
            >
              <Text
                fontSize={["3xl", "4xl"]}
                className={font.className}
                lineHeight={1}
              >
                <Text fontSize={["lg", "xl"]} as="span" display="block">
                  TITANS OF
                </Text>
                INDUSTRY
              </Text>
            </Box>
            <Box as="main" bgColor="#051937" padding="1rem 2rem">
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
