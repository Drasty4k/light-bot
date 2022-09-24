import { Message } from "discord.js";

require("dotenv").config();
import { Client } from "discord.js";

const client = new Client({
  intents: [
    "DirectMessages",
    "GuildInvites",
    "GuildMembers",
    "Guilds",
    "MessageContent"
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", (msg: Message) => {
  console.log(msg.content)
  if (msg.content == "pong") {
    msg.reply("ping");
  }
});

client.login(process.env.DISCORD_TOKEN);
