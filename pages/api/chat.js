import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const fetchDataFromAPI = async (messages) => {
  console.log(messages);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      // max_tokens: 4000,
    });
    console.log("200 DATA");
    console.log(completion.data);
    return completion.data;
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    throw error;
  }
};

export default async (req, res) => {
  const { messages } = req.body;
  try {
    const completion = await fetchDataFromAPI(messages);
    res.status(200).json({ completion });
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
