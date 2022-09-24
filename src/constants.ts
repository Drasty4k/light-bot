import { GatewayIntentsString } from "discord.js";

export const API_RICK_AND_MORTY_URL = "https://rickandmortyapi.com/api/character/?name=";
export const API_BINANCE_URL = "https://api.binance.com/api/v3";

export const intents: GatewayIntentsString[] = [
  "DirectMessages",
  "GuildInvites",
  "GuildMembers",
  "Guilds",
  "MessageContent",
  "GuildMessages"
];

export const coins = [
    {
        name: "BTC",
        value: "BTC"
      },
      {
        name: "ETH",
        value: "ETH"
      }
]