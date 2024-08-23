import { getConfig } from "@/utils/config";
import axios from "axios";
import { MetadataRoute } from "next";
import { Organisation } from "./api/types";

const baseURL = "https://titans-of-industry.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = getConfig();
  const { data: allOrganisations } = await axios.get(
    `${config.apiUrl}/organisations?limit=999`
  );

  const allOrgNetworkUrls = allOrganisations.map((org: Organisation) => ({
    url: `${baseURL}/our-network/${org.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseURL,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseURL}/our-network`,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...allOrgNetworkUrls,
    {
      url: `${baseURL}/find-industry-partners`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
