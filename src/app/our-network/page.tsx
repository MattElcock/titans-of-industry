import { Metadata } from "next";
import { Suspense } from "react";
import { OurNetwork } from "./_OurNetwork";
import { commonOpenGraph } from "@/constants";

const pageTitle = "Our Network | Titans of Industry";
const pageDescription =
  "Explore and connect with the organizations within the Titans of Industry roleplaying community, where industry powerhouses come together to support the Sith Empire in Star Wars: The Old Republic.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://titans-of-industry.vercel.app/our-network",
    ...commonOpenGraph,
  },
};

export default function Page() {
  return (
    <Suspense>
      <OurNetwork />
    </Suspense>
  );
}
