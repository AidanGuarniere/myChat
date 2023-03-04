import { Configuration, OpenAIApi } from "openai";

const fetchDataFromAPI = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 4000,
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
    res.status(500).json({ error: error.message });
  }
};
