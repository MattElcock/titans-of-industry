export const config = {
  guildId: process.env.DISCORD_GUILD_ID,
  channelIds: process.env.DISCORD_CHANNELS?.split(",") || [],
  authToken: process.env.DISCORD_AUTHORIZATION_TOKEN,
};
