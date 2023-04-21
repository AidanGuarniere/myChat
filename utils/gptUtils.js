// gptUtils.js
import axios from "axios";

export const sendMessageHistoryToGPT = async (messageHistory, apiKey) => {
  try {
    const response = await axios.post("/api/gpt", {
      messages: messageHistory,
      apiKey,
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
