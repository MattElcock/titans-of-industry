import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IconCardProps {
  icon: ReactNode;
  heading: string;
  text: string;
}

export const IconCard = ({ icon, heading, text }: IconCardProps) => {
  return (
    <Card maxWidth={["auto", "20rem"]}>
      <CardBody>
        <Heading fontSize="xl" pb={1}>
          {icon} {heading}
        </Heading>
        <Text>{text}</Text>
      </CardBody>
    </Card>
  );
};
