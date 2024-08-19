import { Box, Button, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface PanelProps {
  options: string[];
  multiselect?: boolean;
  defaultOptions?: string[];
  onChange: (val: string[]) => void;
}

const Panel = ({ options, defaultOptions, onChange }: PanelProps) => {
  return (
    <Box
      position="absolute"
      padding="1rem 2rem"
      bgColor="#282828"
      color="#E1E1E1"
      zIndex={999}
      top={12}
      borderRadius={5}
    >
      <CheckboxGroup
        colorScheme="teal"
        onChange={onChange}
        defaultValue={defaultOptions}
      >
        <Stack spacing={3} direction="column">
          {options.map((option) => (
            <Checkbox key={option} value={option}>
              {option}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

interface FilterDropdownProps {
  label: string;
  options: string[];
  multiselect?: boolean;
  defaultOptions?: string[];
  onChange: (val: string[]) => void;
}

export const FilterDropdown = ({
  label,
  options,
  multiselect,
  defaultOptions,
  onChange,
}: FilterDropdownProps) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const togglePanelVisibility = () => {
    setIsPanelVisible((current) => !current);
  };
  return (
    <Box position="relative">
      <Button
        width="fit-content"
        bgColor="#282828"
        color="#E1E1E1"
        _hover={{ bgColor: "#1a1a1a" }}
        rightIcon={<ChevronDown size={19} />}
        onClick={togglePanelVisibility}
      >
        {label}
      </Button>
      {isPanelVisible && (
        <Panel
          options={options}
          multiselect={multiselect}
          onChange={onChange}
          defaultOptions={defaultOptions}
        />
      )}
    </Box>
  );
};
