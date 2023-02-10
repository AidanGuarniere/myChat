import axios from "axios";

const fetchDataFromAPI = async (prompt) => {
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: prompt,
        max_tokens: 4000,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      }
    );
    // Extract the generated text from the response
    const completion = response.data.choices[0].text;

    // Return the generated text to the client
    return completion;
  } catch (error) {
    // Return an error to the client if something went wrong
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
