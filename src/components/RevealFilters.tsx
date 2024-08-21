"use client";

import { Button, Stack, useDisclosure, Box } from "@chakra-ui/react";
import { Filter } from "lucide-react";
import { ReactNode } from "react";

interface RevealFiltersProps {
  children: ReactNode;
}

export const RevealFilters = ({ children }: RevealFiltersProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4}>
      <Button
        onClick={onToggle}
        variant="flat"
        color="#E1E1E1"
        justifyContent="left"
        leftIcon={<Filter size={16} />}
      >
        {`${isOpen ? "Hide" : "Show"} Filters`}
      </Button>
      {isOpen && <Box>{children}</Box>}
    </Stack>
  );
};
