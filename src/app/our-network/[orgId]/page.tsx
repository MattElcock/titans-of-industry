import { useParseText } from "@/hooks/useParseText";
import { getConfig } from "@/utils/config";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { mdComponentsMap } from "./_mdComponentsMap";
import { Metadata } from "next";
import { commonOpenGraph, commonOtherMetaTags } from "@/constants";

interface Params {
  orgId: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const config = getConfig();
  const { orgId } = params;

  const { data: organisation } = await axios.get(
    `${config.apiUrl}/organisations/${orgId}`
  );

  const pageTitle = `${organisation.name} | Titans of Industry`;
  const pageDescription = `Discover and connect with ${organisation.name}, part of the Titans of Industry roleplaying community supporting the Sith Empire in Star Wars: The Old Republic.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://titans-of-industry.vercel.app/our-network/${orgId}`,
      ...commonOpenGraph,
    },
    other: {
      ...commonOtherMetaTags,
    },
  };
}

export default async function Organisation({ params }: { params: Params }) {
  const parseText = useParseText();

  const config = getConfig();
  const { orgId } = params;

  const { data: organisation } = await axios.get(
    `${config.apiUrl}/organisations/${orgId}`
  );

  const parsedDescription = await parseText(organisation.description);

  return (
    <Box>
      <ReactMarkdown components={mdComponentsMap} rehypePlugins={[rehypeRaw]}>
        {parsedDescription}
      </ReactMarkdown>
    </Box>
  );
}
