import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";

require("dotenv").config();

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN as string
);

const gatherSlashCommands = () => {
  const dataArray = [];
  const commandsPath = path.join(__dirname, "interactions");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { data } = require(filePath);
    dataArray.push(data.toJSON());
  }
  return dataArray;
};


export const registerCommands = async () => {
  try {
    console.log("Redeploying commands!");
    const dataArray = gatherSlashCommands();
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
      { body: dataArray }
    ).then(() => console.log('Done redeplying commands'));
  } catch (error) {
    console.error("Error here!!!", error);
  }
}; 
