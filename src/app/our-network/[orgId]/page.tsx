import { useParseText } from "@/hooks/useParseText";
import { getConfig } from "@/utils/config";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { mdComponentsMap } from "./_mdComponentsMap";

interface Params {
  orgId: string;
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
