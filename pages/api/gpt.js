import { Configuration, OpenAIApi } from "openai";

const fetchDataFromAPI = async (messages, apiKey) => {
  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return completion.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async (req, res) => {
  const { messages, apiKey } = req.body;
  try {
    const completion = await fetchDataFromAPI(messages, apiKey);
    res.status(200).json({ completion });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
