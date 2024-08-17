import { getConfig } from "@/utils/config";
import axios from "axios";
import { useQuery } from "react-query";

const getOrganisations = () => {
  const config = getConfig();

  return axios.get(`${config.apiUrl}/organisations`);
};

export const useOrganisations = () => {
  const query = useQuery("organisations", getOrganisations);

  return { ...query, data: query.data?.data };
};
