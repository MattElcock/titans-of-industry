interface Config {
  guildId: string;
  channelIds: string[];
  authToken: string;
  apiUrl: string;
}

/**
 * Retrieves the configuration for the application.
 *
 * @return {Config} The application configuration object.
 * @throws {Error} If any of the required environment variables are missing.
 */
export const getConfig = (): Config => {
  if (!process.env.DISCORD_GUILD_ID) {
    throw new Error("Missing environment variable: DISCORD_GUILD_ID");
  }

  if (!process.env.DISCORD_CHANNELS) {
    throw new Error("Missing environment variable: DISCORD_CHANNELS");
  }

  if (!process.env.DISCORD_AUTHORIZATION_TOKEN) {
    throw new Error(
      "Missing environment variable: DISCORD_AUTHORIZATION_TOKEN"
    );
  }

  if (!process.env.NODE_ENV) {
    throw new Error("Missing environment variable: NODE_ENV");
  }

  return {
    guildId: process.env.DISCORD_GUILD_ID,
    channelIds: process.env.DISCORD_CHANNELS.split(","),
    authToken: process.env.DISCORD_AUTHORIZATION_TOKEN,
    apiUrl: ["development", "test"].includes(process.env.NODE_ENV)
      ? "http://localhost:3000/api"
      : "https://titans-of-industry.vercel.app/api",
  };
};
