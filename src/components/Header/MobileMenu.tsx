"use client";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  IconButton,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Earth,
  Factory,
  Home,
  Menu as MenuIcon,
  Network,
  Shield,
} from "lucide-react";
import Link from "next/link";
import React, { ReactElement } from "react";
import { DiscordInvite } from "./DiscordInvite";
import { usePathname, useSearchParams } from "next/navigation";

interface NavLinkProps {
  icon: ReactElement;
  href: string;
  children: string;
  active?: boolean;
}

const NavLink = ({ icon, href, children, active }: NavLinkProps) => {
  return (
    <ListItem color={active ? "primary" : "inherit"}>
      <Link href={href}>
        <Stack direction="row" gap={3} alignItems="center">
          {React.cloneElement(icon, { size: 19 })}
          <Text fontSize="xl">{children}</Text>
        </Stack>
      </Link>
    </ListItem>
  );
};

const MenuLinks = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <UnorderedList styleType="none" spacing={3}>
      <NavLink href="/" icon={<Home />} active={pathname === "/"}>
        Home
      </NavLink>
      <NavLink
        href="/our-network"
        icon={<Network />}
        active={
          pathname.endsWith("/our-network") &&
          (searchParams.size === 0 ||
            !!searchParams.get("page") ||
            (searchParams.get("type")?.split(",") || []).length > 1)
        }
      >
        Our Network
      </NavLink>

      <UnorderedList styleType="none" spacing={3} ml={7}>
        <NavLink
          href="/our-network?type=Powerbases"
          icon={<Shield />}
          active={
            pathname.endsWith("/our-network") &&
            searchParams.get("type") === "Powerbases"
          }
        >
          Powerbases
        </NavLink>
        <NavLink
          href="/our-network?type=Governorships"
          icon={<Earth />}
          active={
            pathname.endsWith("/our-network") &&
            searchParams.get("type") === "Governorships"
          }
        >
          Governorships
        </NavLink>
        <NavLink
          href="/our-network?type=Industries"
          icon={<Factory />}
          active={
            pathname.endsWith("/our-network") &&
            searchParams.get("type") === "Industries"
          }
        >
          Industries
        </NavLink>
      </UnorderedList>
    </UnorderedList>
  );
};

export const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        variant="flat"
        icon={<MenuIcon />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        aria-label="Open Menu"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent width="70vw!important">
          <DrawerCloseButton />
          <DrawerBody pt={16}>
            <MenuLinks />
          </DrawerBody>
          <DrawerFooter>
            <DiscordInvite />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
