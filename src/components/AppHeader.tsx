import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";

const font = EB_Garamond({
  subsets: ["latin"],
});

export const AppHeader = () => {
  return (
    <Box as="header" bgColor="#167869" color="#fff" padding="0.5rem 2rem">
      <Box display="flex" alignItems="center" gap={5}>
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <Text fontSize="2xl" className={font.className}>
          TITANS OF INDUSTRY
        </Text>
      </Box>
    </Box>
  );
};
