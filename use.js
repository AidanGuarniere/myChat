const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const ask = async () => {
  const response = await openai.listModels();
  console.log(response);
};

ask();
