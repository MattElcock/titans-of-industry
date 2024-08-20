import { Metadata } from "next";
import { Suspense } from "react";
import { OurNetwork } from "./_OurNetwork";

export const metadata: Metadata = {
  title: "Our Network | Titans of Industry",
  description:
    "Explore and connect with the organizations within the Titans of Industry roleplaying community, where industry powerhouses come together to support the Sith Empire in Star Wars: The Old Republic.",
};

export default function Page() {
  return (
    <Suspense>
      <OurNetwork />
    </Suspense>
  );
}
