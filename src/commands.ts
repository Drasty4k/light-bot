import { REST, Routes, SlashCommandBuilder } from "discord.js";
require("dotenv").config();
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN as string
);

const data = new SlashCommandBuilder()
  .setName("crypto")
  .setDescription("See crypto data")
  .addStringOption((option) =>
    option
      .setName("coin")
      .setDescription("coin")
      .setRequired(true)
      .addChoices(
        {
          name: "BTC",
          value: "BTC"
        },
        {
          name: "ETH",
          value: "ETH"
        }
      )
  )
  .addStringOption((option) =>
    option
      .setName("currency")
      .setDescription(
        "Choose the currency in which you want to see the price of the last traded coin"
      )
      .setRequired(true)
      .addChoices(
        {
          name: "EUR",
          value: "EUR"
        },
        {
          name: "USD",
          value: "USDT"
        },
        {
          name: "GBP",
          value: "GBP"
        }
      )
  );

export const registerCommands = async () => {
  try {
    console.log("Redeploying commands!");
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
      { body: [data] }
    );
  } catch (error) {
    console.error("Error here!!!", error);
  }
};
