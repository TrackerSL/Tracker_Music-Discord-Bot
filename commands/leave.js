// Import the required modules
const { Client, Intents } = require("discord.js");
const config = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

// Log in to Discord with your bot's token
client.login(config.token);

// Listen for message events
client.on("messageCreate", async (message) => {
  // Ignore messages from bots or without prefix
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  // Get the command and arguments from the message
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Handle the leave command
  if (command === "leave") {
    // Check if the user is in a voice channel
    if (!message.member.voice.channel) {
      return message.reply("You need to be in a voice channel to use this command.");
    }

    // Check if the bot is in the same voice channel as the user
    if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
      return message.reply("I'm not in your voice channel.");
    }

    // Leave the voice channel
    await client.leaveVoiceChannel(message.member.voice.channelId);

    // Send a confirmation message
    message.channel.send("I have left the voice channel.");
  }
});
