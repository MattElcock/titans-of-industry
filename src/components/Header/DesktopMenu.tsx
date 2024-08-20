"use client";

import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: string;
  active?: boolean;
}

const NavLink = ({ href, children, active }: NavLinkProps) => {
  return (
    <ListItem>
      <Link href={href}>
        <Text
          fontSize="xl"
          borderBottom={active ? "2px solid #157868" : undefined}
        >
          {children}
        </Text>
      </Link>
    </ListItem>
  );
};

export const DesktopMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Box display="flex" justifyContent="center">
      <UnorderedList
        styleType="none"
        display="flex"
        gap={7}
        alignItems="center"
      >
        <NavLink href="/" active={pathname === "/"}>
          Home
        </NavLink>
        <NavLink
          href="/our-network"
          active={
            pathname.endsWith("/our-network") &&
            (searchParams.size === 0 ||
              !!searchParams.get("page") ||
              (searchParams.get("type")?.split(",") || []).length > 1)
          }
        >
          Our Network
        </NavLink>
        <NavLink
          href="/our-network?type=Powerbases"
          active={
            pathname.endsWith("/our-network") &&
            searchParams.get("type") === "Powerbases"
          }
        >
          Powerbases
        </NavLink>
        <NavLink
          href="/our-network?type=Governorships"
          active={
            pathname.endsWith("/our-network") &&
            searchParams.get("type") === "Governorships"
          }
        >
          Governorships
        </NavLink>
        <NavLink
          href="/our-network?type=Industries"
          active={
            pathname.endsWith("/our-network") &&
            searchParams.get("type") === "Industries"
          }
        >
          Industries
        </NavLink>
      </UnorderedList>
    </Box>
  );
};
