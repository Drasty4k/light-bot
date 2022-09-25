import { CacheType, ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { fetchBinanceData } from "../binance";

export const data = new SlashCommandBuilder()
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

export const getCryptoData = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  const coin = interaction.options.getString("coin");
  const currency = interaction.options.getString("currency");
  if (!coin || !currency) return;

  const { price } = await fetchBinanceData(coin, currency);

  await interaction.reply(
    `Last recorded transaction was 1 ${coin} for ${price} ${currency}`
  );
};
