import { CacheType, ChatInputCommandInteraction, Interaction } from "discord.js";
import { fetchBinanceData } from "../binance";

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
