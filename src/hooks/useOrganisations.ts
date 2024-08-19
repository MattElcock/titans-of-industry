import { getConfig } from "@/utils/config";
import axios from "axios";
import { useQuery } from "react-query";

interface useOrganisationsOptions {
  pagination: {
    page: number;
  };
  filters: {
    type?: string;
  };
}

export const useOrganisations = (options: useOrganisationsOptions) => {
  const queryFunc = () => {
    const config = getConfig();
    const params = [
      `page=${options.pagination.page}`,
      ...(options.filters.type ? [`type=${options.filters.type}`] : []),
    ];

    return axios.get(`${config.apiUrl}/organisations?${params.join("&")}`);
  };

  const query = useQuery(["organisations", options], queryFunc);

  const pagination = query.data
    ? {
        total: Number(query.data.headers["x-total"]),
        limit: Number(query.data.headers["x-limit"]),
      }
    : undefined;

  return { ...query, data: query.data?.data, pagination };
};
