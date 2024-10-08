import { Organisation } from "@/app/api/types";
import { getConfig } from "@/utils/config";
import axios from "axios";
import { useQuery } from "react-query";

interface useOrganisationsOptions {
  pagination: {
    page: number;
    limit?: number;
  };
  filters: {
    type?: string;
    wantedConnections?: string;
    potentialOffers?: string;
  };
}

interface useOrganisationsReturn {
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  data?: Organisation[];
  pagination?: {
    total: number;
    limit: number;
  };
}

export const useOrganisations = (
  options: useOrganisationsOptions,
  enabled: boolean = true
): useOrganisationsReturn => {
  const queryFunc = () => {
    const config = getConfig();

    const params = { ...options.pagination, ...options.filters };
    const queryString = Object.entries(params)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join("&");

    return axios.get(`${config.apiUrl}/organisations?${queryString}`);
  };

  const query = useQuery(["organisations", options], queryFunc, { enabled });

  const pagination = query.data
    ? {
        total: Number(query.data.headers["x-total"]),
        limit: Number(query.data.headers["x-limit"]),
      }
    : undefined;

  return {
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    data: query.data?.data,
    pagination,
  };
};
