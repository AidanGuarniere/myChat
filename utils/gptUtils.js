// gptUtils.js
import axios from "axios";

export const sendMessageHistoryToGPT = async ({model, messageHistory}) => {
  try {
    const response = await axios.post("/api/proxy/gpt", {
      model,
      messages: messageHistory,
    });
    if (response.status === 200) {
      messageHistory.push(response.data.completion.choices[0].message);
      return messageHistory;
    } else {
      throw new Error("Error while sending message history to GPT");
    }
  } catch (error) {
    console.error("sendMessageHistoryToGPT error:", error.code);
    throw error;
  }
};
