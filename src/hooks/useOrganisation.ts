import { getConfig } from "@/utils/config";
import axios from "axios";
import { useQuery } from "react-query";

const getOrganisationById = (id: string) => {
  const config = getConfig();

  return axios.get(`${config.apiUrl}/organisations/${id}`);
};

export const useOrganisation = (id: string, enabled: boolean = true) => {
  const query = useQuery(["organisations", id], () => getOrganisationById(id), {
    enabled,
  });

  return { ...query, data: query.data?.data };
};
