// gptUtils.js
import axios from "axios";

export const sendMessageHistoryToGPT = async (messageHistory) => {
  try {
    const response = await axios.post("/api/proxy/gpt", {
      messages: messageHistory,
    });
    if (response.status === 200) {
      return response.data.completion;
    } else {
      throw new Error("Error while sending message history to GPT");
    }
  } catch (error) {
    console.error("sendMessageHistoryToGPT error:", error.code);
    throw error;
  }
};
