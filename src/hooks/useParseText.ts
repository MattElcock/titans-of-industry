import { getConfig } from "@/utils/config";
import axios from "axios";
import { flow } from "lodash";

function extractAllUserIds(input: string): string[] {
  const regex = /<@(\d+)>/g;
  const matches = [...input.matchAll(regex)];
  return matches.map((match) => match[1]);
}

// Replaces text wrapped with double underscores to underlined HTML
function convertToU(input: string): string {
  return input.replace(/__([^_]+)__/g, "<u>$1</u>");
}

// Replaces Discord user IDs with their corresponding usernames
async function swapDiscordIdForUsername(input: string): Promise<string> {
  const config = getConfig();
  const allUserIds = extractAllUserIds(input);

  if (allUserIds.length === 0) {
    return input;
  }

  let processedText = input;

  for (const userId of allUserIds) {
    processedText = processedText.replace(
      `<@${userId}>`,
      `[Redacted, please view post in Discord to get in contact.]`
    );
  }

  return processedText;
}

/**
 * Replaces single newlines with double newlines in the input text,
 * except when the newline is directly after a line that starts with one or more hashes. These
 * are titles in Discord and adding another newline will have them parse as paragraphs instead.
 */
function fixNewlines(input: string): string {
  return input.replace(/(?<!^#+)\n(?!\n)/g, "\n\n");
}

export const useParseText = () => {
  const parseText = async (text: string): Promise<string> => {
    const flowFunctions = flow([
      convertToU,
      fixNewlines,
      swapDiscordIdForUsername,
    ]);
    return flowFunctions(text);
  };

  return parseText;
};
