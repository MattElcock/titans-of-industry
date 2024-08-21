import { FilterDropdown } from "@/components/FilterDropdown";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { Stack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

const connectionCategories = [
  "Agriculture",
  "Finance",
  "Entertainment",
  "Health+Wellbeing",
  "Land Development",
  "Logistics",
  "Manufacturing",
  "Military",
  "People",
];

export const FiltersBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const getQueryParam = useGetQueryParam();

  const type = getQueryParam("type");
  const wantedConnections = getQueryParam("wantedConnections");
  const potentialOffers = getQueryParam("potentialOffers");

  const updateUrl = (params: Record<string, string | undefined>) => {
    const queryString = Object.entries(params)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join("&");

    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleTypeChange = (type: string[]) => {
    const params = {
      type: type.length > 0 ? type.toString() : undefined,
      wantedConnections,
      potentialOffers,
    };

    updateUrl(params);
  };

  const handleWantedConnectionsChange = (wantedConnections: string[]) => {
    const params = {
      type,
      wantedConnections:
        wantedConnections.length > 0 ? wantedConnections.toString() : undefined,
      potentialOffers,
    };

    updateUrl(params);
  };

  const handlePotentialOffersChange = (potentialOffers: string[]) => {
    const params = {
      type,
      wantedConnections,
      potentialOffers:
        potentialOffers.length > 0 ? potentialOffers.toString() : undefined,
    };

    updateUrl(params);
  };

  return (
    <Stack spacing={5} direction={["column", "row"]}>
      <FilterDropdown
        label="Type"
        defaultOptions={type ? type.split(",") : undefined}
        options={["Governorships", "Industries", "Powerbases"]}
        onChange={handleTypeChange}
      />
      <FilterDropdown
        label="Wanted Connections"
        defaultOptions={
          wantedConnections ? wantedConnections.split(",") : undefined
        }
        options={connectionCategories}
        onChange={handleWantedConnectionsChange}
      />
      <FilterDropdown
        label="Potential Offers"
        defaultOptions={
          potentialOffers ? potentialOffers.split(",") : undefined
        }
        options={connectionCategories}
        onChange={handlePotentialOffersChange}
      />
    </Stack>
  );
};
