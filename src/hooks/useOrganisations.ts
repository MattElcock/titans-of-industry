import { getConfig } from "@/utils/config";
import axios from "axios";
import { useQuery } from "react-query";

interface useOrganisationsOptions {
  pagination: {
    page: number;
  };
}

export const useOrganisations = (options: useOrganisationsOptions) => {
  const queryFunc = () => {
    const config = getConfig();
    return axios.get(
      `${config.apiUrl}/organisations?page=${options.pagination.page}`
    );
  };

  const query = useQuery(
    ["organisations", `page-${options.pagination.page}`],
    queryFunc
  );

  const pagination = query.data
    ? {
        total: Number(query.data.headers["x-total"]),
        limit: Number(query.data.headers["x-limit"]),
      }
    : undefined;

  return { ...query, data: query.data?.data, pagination };
};
