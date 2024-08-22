import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: string;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <ListItem fontSize="xl">
      <Link href={href}>{children}</Link>
    </ListItem>
  );
};

export const DesktopMenu = () => {
  return (
    <Box display="flex" justifyContent="center">
      <UnorderedList
        styleType="none"
        display="flex"
        gap={7}
        alignItems="center"
      >
        <NavLink href="/">Home</NavLink>
        <NavLink href="/our-network">Our Network</NavLink>
        <NavLink href="/our-network?type=Powerbases">Powerbases</NavLink>
        <NavLink href="/our-network?type=Governorships">Governorships</NavLink>
        <NavLink href="/our-network?type=Industries">Industries</NavLink>
      </UnorderedList>
    </Box>
  );
};
