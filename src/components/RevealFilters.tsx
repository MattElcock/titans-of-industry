"use client";

import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { Button, Stack, useDisclosure, Box, Badge } from "@chakra-ui/react";
import { Filter } from "lucide-react";
import { ReactNode } from "react";

interface RevealFiltersProps {
  totalAppliedFilters: number;
  children: ReactNode;
}

export const RevealFilters = ({
  totalAppliedFilters,
  children,
}: RevealFiltersProps) => {
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
        {`${isOpen ? "Hide" : "Show"} Filters`}{" "}
        {totalAppliedFilters > 0 && <Badge ml={2}>{totalAppliedFilters}</Badge>}
      </Button>
      {isOpen && <Box>{children}</Box>}
    </Stack>
  );
};
