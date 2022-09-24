import { Interaction, Message, Client } from "discord.js";
import { registerCommands } from "./commands";

import { intents } from "./constants";
import { getCryptoData } from "./interactions/crypto";
import { replyAboutRM, replyPong } from "./message-create/replies";

require("dotenv").config();

const redeployCommands = true;

const client = new Client({
  intents
});

if (redeployCommands) {
  registerCommands();
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async (msg: Message) => {
  if (msg.content == "pong") {
    replyPong(msg);
  }
  if (msg.content.includes("Tell me about")) {
    replyAboutRM(msg);
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "crypto") {
    getCryptoData(interaction);
  }
});

client.login(process.env.DISCORD_TOKEN);
