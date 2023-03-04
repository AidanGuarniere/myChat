import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const fetchDataFromAPI = async (prompt) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000
    });
    return completion.data;
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await fetchDataFromAPI(prompt);
    res.status(200).json({ completion });
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
