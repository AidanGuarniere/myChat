import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const fetchDataFromAPI = async (messages) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      // max_tokens: 4000,
    });
    return completion.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async (req, res) => {
  const { messages } = req.body;
  try {
    const completion = await fetchDataFromAPI(messages);
    res.status(200).json({ completion });
  } catch (error) {
    // Use a default status code (e.g., 500) if error.status is not valid
    const statusCode = error.status || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

