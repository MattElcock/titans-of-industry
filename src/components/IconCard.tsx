import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import Link from "next/link";

interface IconCardProps {
  icon: ReactNode;
  heading: string;
  text: string;
  href: string;
}

export const IconCard = ({ icon, heading, text, href }: IconCardProps) => {
  return (
    <Link href={href}>
      <Card width="100%" height="100%" bgColor="#062046" color="#E1E1E1">
        <CardBody>
          <Heading
            fontSize={["xl", "2xl"]}
            pb={1}
            lineHeight={2}
            display="flex"
            alignItems="center"
            gap={2}
          >
            {icon} {heading}
          </Heading>
          <Text fontSize={["md", "lg"]}>{text}</Text>
        </CardBody>
      </Card>
    </Link>
  );
};
