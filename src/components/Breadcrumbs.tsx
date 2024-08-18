"use client";

import { useOrganisation } from "@/hooks/useOrganisation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  slug: string;
  href: string;
}

const slugMap: Record<string, string> = {
  "/": "Home",
  "our-network": "Our Network",
};

const Crumb = ({ slug, href, ...rest }: BreadcrumbProps) => {
  const slugs = href.split("/");
  const parentSlugIndex =
    slugs.findIndex((potentialSlug) => potentialSlug === slug) - 1;
  const parentSlug = slugs[parentSlugIndex];

  const { isLoading, data } = useOrganisation(
    slug,
    parentSlug === "our-network"
  );

  if (isLoading) {
    return (
      <BreadcrumbItem {...rest}>
        <Skeleton mt={0.5} height={4} width="7rem" />
      </BreadcrumbItem>
    );
  }

  const parsedSlug = slugMap[slug] || data?.name;

  return (
    <BreadcrumbItem {...rest}>
      <BreadcrumbLink href={href} as={Link} lineHeight={1}>
        <Text noOfLines={1} color="#E1E1E1">
          {parsedSlug}
        </Text>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
};

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const slugs = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb mb={4}>
      {slugs.length > 0 && <Crumb slug="/" href="/" />}
      {slugs.map((slug, i) => (
        <Crumb
          key={`slug-${slug}-${i}`}
          slug={slug}
          href={`/${slugs.slice(0, i + 1).join("/")}`}
        />
      ))}
    </Breadcrumb>
  );
};
