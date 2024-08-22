import { As, UnorderedList, ListItem, Text, Heading } from "@chakra-ui/react";
import { Components } from "react-markdown";

export const mdComponentsMap: Partial<Components> = {
  p: ({ node, ...props }) => (
    <Text {...props} pb={3} as={node?.tagName as As} />
  ),
  h1: ({ node, ...props }) => (
    <Heading {...props} pb={5} as={node?.tagName as As} />
  ),
  h2: ({ node, ...props }) => (
    <Heading {...props} size="lg" pb={3} pt={2} as={node?.tagName as As} />
  ),
  h3: ({ node, ...props }) => (
    <Heading {...props} size="lg" pb={3} pt={2} as={node?.tagName as As} />
  ),
  ul: ({ node, ...props }) => (
    <UnorderedList {...props} pb={3} as={node?.tagName as As} />
  ),
  li: ({ node, ...props }) => (
    <ListItem
      {...props}
      as={node?.tagName as As}
      css={{ "> p": { padding: 0 } }}
    />
  ),
};
