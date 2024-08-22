"use client";

import { Select as ChakraReactSelect } from "chakra-react-select";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  defaultValue?: { label: string; value: string };
  options: Array<{ label: string; value: string }>;
  onChange: (newValue: Option | null) => void;
}

export const Select = ({ defaultValue, options, onChange }: SelectProps) => {
  return (
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
  );
};
