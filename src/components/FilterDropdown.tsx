import {
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  useOutsideClick,
} from "@chakra-ui/react";
import { delay } from "lodash";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

interface PanelProps {
  id: string;
  options: string[];
  multiselect?: boolean;
  defaultOptions?: string[];
  onChange: (val: string[]) => void;
}

const Panel = ({ id, options, defaultOptions, onChange }: PanelProps) => {
  return (
    <Box
      id={id}
      position={["initial", "absolute"]}
      padding="1rem 2rem"
      bg="tertiary.500"
      color="text"
      zIndex={999}
      top={12}
      mt={[3, 0]}
      borderRadius={5}
      width={["100%", "max-content"]}
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
  const ref = useRef<HTMLDivElement>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  useOutsideClick({
    ref: ref,
    handler: () => delay(() => setIsPanelVisible(false), 10),
  });

  const togglePanelVisibility = () => {
    setIsPanelVisible((current) => !current);
  };

  const numOfAppliedFilters = defaultOptions?.length || 0;

  const panelId = `${label}-panel`;

  return (
    <Box ref={ref} position="relative" width={["100%", "fit-content"]}>
      <Button
        width="100%"
        colorScheme="tertiary"
        rightIcon={<ChevronDown size={19} />}
        onClick={togglePanelVisibility}
        aria-controls={panelId}
      >
        {label}
        {numOfAppliedFilters > 0 && <Badge ml={2}>{numOfAppliedFilters}</Badge>}
      </Button>
      {isPanelVisible && (
        <Panel
          id={panelId}
          options={options}
          multiselect={multiselect}
          onChange={onChange}
          defaultOptions={defaultOptions}
        />
      )}
    </Box>
  );
};
