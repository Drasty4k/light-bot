import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Receive help and some usefull commands");

export const helpEmbed = new EmbedBuilder()
  .setColor([159, 26, 26])
  .setTitle("You called for help")
  .setAuthor({
    name: "Tudor and Dragos",
    iconURL:
      "https://cdn.discordapp.com/attachments/1023637526579253299/1023637644221096007/4.anime_official-20220806-0002.jpg"
  })
  .setDescription("Here are some commands you can start with")
  .setThumbnail(
    "https://cdn.discordapp.com/attachments/1023637526579253299/1023637621026607274/4.anime_official-20220704-0001.jpg"
  )
  .addFields({
    name: "/crypto",
    value: "Select the coin and currency and I will return a useful chart",
    inline: true
  })
  .setFooter({ text: "That's all folks" })
  .setTimestamp();

export const getHelpEmbed = async (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
};
