import { get } from "../get";

export const getChannelById = async (id: string) => {
  const resp = await get(`channels/${id}`);

  return resp;
};
