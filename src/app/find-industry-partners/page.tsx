import { commonOpenGraph, commonOtherMetaTags } from "@/constants";
import { getConfig } from "@/utils/config";
import axios from "axios";
import { Metadata } from "next";
import { FindIndustryPartners } from "./_FindIndustryPartners";
import { Suspense } from "react";

const pageTitle = "Find Industry Partners | Titans of Industry";
const pageDescription =
  "Select an organization from within our network and explore their suggested industry partners.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://titans-of-industry.vercel.app/find-industry-partners",
    ...commonOpenGraph,
  },
  other: {
    ...commonOtherMetaTags,
  },
};

export default async function Page() {
  const config = getConfig();
  const { data: allOrganisations } = await axios.get(
    `${config.apiUrl}/organisations?limit=999`
  );

  return (
    <Suspense>
      <FindIndustryPartners allOrganisations={allOrganisations} />
    </Suspense>
  );
}
