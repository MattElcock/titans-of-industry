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
  return {
    guildId: process.env.DISCORD_GUILD_ID || "",
    channelIds: process.env.DISCORD_CHANNELS?.split(",") || [],
    authToken: process.env.DISCORD_AUTHORIZATION_TOKEN || "",
    apiUrl: ["development", "test"].includes(process.env.NODE_ENV)
      ? "http://localhost:3000/api"
      : "https://titans-of-industry.vercel.app/api",
  };
};
