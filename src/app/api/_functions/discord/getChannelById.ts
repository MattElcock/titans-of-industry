import { apiGet } from "../apiGet";

export const getChannelById = async (id: string) => {
  const resp = await apiGet(`channels/${id}`);

  return resp;
};
