import { Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react";
import { startCase } from "lodash";
import { Earth, Factory, Shield } from "lucide-react";

import { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  industries: <Factory size={18} />,
  powerbases: <Shield size={18} />,
  governorships: <Earth size={18} />,
};

interface OrgCardProps {
  name: string;
  type: string;
}

export const OrgCard = ({ name, type }: OrgCardProps) => {
  return (
    <Card width={["auto", "20rem"]}>
      <CardBody>
        <Stack direction="row" alignItems="center" pb={1}>
          {iconMap[type]}
          <Text>{startCase(type)}</Text>
        </Stack>
        <Heading fontSize="lg" pb={1}>
          {name}
        </Heading>
      </CardBody>
    </Card>
  );
};
