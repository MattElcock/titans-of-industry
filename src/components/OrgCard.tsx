import {
  Card,
  CardBody,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { startCase } from "lodash";
import { Earth, Factory, Shield } from "lucide-react";
import Link from "next/link";

import { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  industries: <Factory size={18} />,
  powerbases: <Shield size={18} />,
  governorships: <Earth size={18} />,
};

interface OrgCardProps {
  id: string;
  name: string;
  type: string;
}

export const OrgCardLoadingState = () => {
  return <Skeleton width="100%" height="6rem" />;
};

export const OrgCard = ({ id, name, type }: OrgCardProps) => {
  return (
    <Link href={`/our-network/${id}`}>
      <Card
        width="100%"
        height="100%"
        bgColor="#062046"
        color="#E1E1E1"
        _hover={{
          opacity: 0.5,
          bgColor: "#062046",
        }}
      >
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
    </Link>
  );
};
