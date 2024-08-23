"use client";

import { Box, Text } from "@chakra-ui/react";
import { Select as ChakraReactSelect } from "chakra-react-select";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  defaultValue?: { label: string; value: string };
  options: Array<{ label: string; value: string }>;
  onChange: (newValue: Option | null) => void;
}

export const Select = ({
  label,
  defaultValue,
  options,
  onChange,
}: SelectProps) => {
  return (
    <Box width={["100%", "30rem"]}>
      <Text mb={2}>{label}</Text>
      <ChakraReactSelect
        useBasicStyles
        onChange={onChange}
        chakraStyles={{
          control: (provided) => ({
            ...provided,
            color: "text",
            bg: "tertiary.500",
            borderColor: "tertiary.500",
          }),
          menu: (provided) => ({
            ...provided,
            color: "text",
          }),
          menuList: (provided) => ({
            ...provided,
            bg: "tertiary.500",
            borderColor: "tertiary.500",
          }),
          option: (provided) => ({
            ...provided,
            bg: "tertiary.500",
            _selected: {
              bg: "primary.500",
            },
            _hover: {
              bg: "tertiary.600",
            },
          }),
        }}
        defaultValue={defaultValue}
        options={options}
      />
    </Box>
  );
};
