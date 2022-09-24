import axios from "axios";
import { Message, ModalBuilder } from "discord.js";

require("dotenv").config();
import { Client } from "discord.js";
import { intents } from "./constants";

const API_URL = "https://rickandmortyapi.com/api/character/?name=";

const client = new Client({
  intents
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async (msg: Message) => {
  console.log(msg.content);
  if (msg.content == "pong") {
    msg.reply("ping");
    return;
  }
  if (msg.content.includes("Tell me about")) {
    const character = msg.content.split(" ")[3];
    const resp = await axios(`${API_URL}${character}`);
    const data = resp.data;
    const charInfo = data.results[0];
    msg.reply(
      `His name is: ${charInfo.name}, he is ${charInfo.status}, his home planet is ${charInfo.origin.name}`
    );
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);
