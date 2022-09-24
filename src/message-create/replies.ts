import axios from "axios";
import { Message } from "discord.js";
import { API_RICK_AND_MORTY_URL } from "../constants";
export const replyPong = (msg: Message) => {
  return msg.reply("ping");
};

export const replyAboutRM = async (msg: Message) => {
  const character = msg.content.split(" ")[3];
  try {
    const resp = await axios(`${API_RICK_AND_MORTY_URL}${character}`);
    const data = resp.data;
    const charInfo = data.results[0];
    return msg.reply(
      `His name is: ${charInfo.name}, he is ${charInfo.status}, his home planet is ${charInfo.origin.name}`
    );
  } catch (e) {
    return msg.reply("Character not found :face_holding_back_tears: ");
  }
};
