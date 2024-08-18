import { getConfig } from "@/utils/config";
import {
  Box,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import axios from "axios";

interface StatisticProps {
  label: string;
  value: string | number;
  large?: boolean;
}

const Statistic = ({ label, value, large }: StatisticProps) => {
  return (
    <Stat textAlign="center">
      <StatNumber
        fontSize={[large ? "4xl" : "2xl", large ? "6xl" : "4xl"]}
        lineHeight={1}
        color="#157868"
      >
        {value}
      </StatNumber>
      <StatLabel fontSize={[large ? "xl" : "md", large ? "2xl" : "xl"]}>
        {label}
      </StatLabel>
    </Stat>
  );
};

export const NetworkStatistics = async () => {
  try {
    const config = getConfig();
    const { data } = await axios.get(`${config.apiUrl}/statistics`);

    return (
      <Card bgColor="transparent" border="2px solid #157868" color="#E1E1E1">
        <CardBody padding={["var(--card-padding)", "2rem 5rem"]}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gridTemplateRows="1fr"
            rowGap={5}
            columnGap={[5, 0]}
            alignContent="baseline"
          >
            <Box
              gridRow="1"
              gridColumn="1 / span 3"
              alignSelf="center"
              justifySelf="center"
            >
              <Statistic label="Organisations" value={data.total} large />
            </Box>
            <Statistic label="Powerbases" value={data.powerbasesCount} />
            <Statistic label="Governorships" value={data.governorshipsCount} />
            <Statistic label="Industries" value={data.industriesCount} />
          </Box>
        </CardBody>
      </Card>
    );
  } catch (error) {
    console.error(error);
    return <p>Error</p>;
  }
};
