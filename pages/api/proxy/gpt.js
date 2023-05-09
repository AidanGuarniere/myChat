import User from "../../../models/UserSchema";
import dbConnect from "../../../utils/dbConnect";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { decrypt } from "../../../utils/crypto";
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

dbConnect();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await User.findById(session.user.id);
  const decryptedApiKey = await decrypt(user.apiKey);

  const { messages } = req.body;
  try {
    const completion = await fetchDataFromAPI(messages, decryptedApiKey);
    res.status(200).json({ completion });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ error: error.message });
  }
}
