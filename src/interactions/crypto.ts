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

  const prices = await fetchBinanceData(coin, currency);

  const canvas = new Canvas(700, 250);
  const ctx = canvas.getContext("2d");

  const closeTime = prices.map((item) => {
    const date = new Date(item.closeTime);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  });
  const closePrice = prices.map((item) => Number(item.closePrince));

  new Chart(ctx, {
    type: "line",
    data: {
      labels: closeTime,
      datasets: [
        {
          label: `${coin} prices`,
          showLine: true,
          data: closePrice,
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(54, 162, 235)",
            "rgba(255, 206, 86)",
            "rgba(75, 192, 192)",
            "rgba(153, 102, 255)",
            "rgba(255, 159, 64)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  await interaction.reply({
    files: [{ attachment: canvas.toBuffer() }],
  });
};
