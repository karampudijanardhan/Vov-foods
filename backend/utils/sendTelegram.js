import axios from "axios";

export const sendTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: process.env.TG_CHAT_ID,
    text: message
  });
};
