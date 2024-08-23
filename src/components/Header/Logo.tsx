import { Box, Text } from "@chakra-ui/react";
import { EB_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = EB_Garamond({
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <Link href="/" style={{ display: "block", width: "fit-content" }}>
      <Box display="flex" gap={3} alignItems="center">
        <Image src="/logo.png" width={48} height={24} alt="Logo" />
        <Text fontSize="3xl" className={font.className} lineHeight={1}>
          <Text fontSize="lg" as="span" display="block">
            TITANS OF
          </Text>
          INDUSTRY
        </Text>
      </Box>
    </Link>
  );
};
