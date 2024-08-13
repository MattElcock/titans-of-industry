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
      <Card width={["auto", "25rem"]}>
        <CardBody>
          <Heading fontSize="xl" pb={1}>
            {icon} {heading}
          </Heading>
          <Text>{text}</Text>
        </CardBody>
      </Card>
    </Link>
  );
};
