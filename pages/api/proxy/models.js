import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/UserSchema";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { decrypt } from "../../../utils/crypto";
import axios from "axios";

const fetchModelsFromAPI = async (apiKey) => {
  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const models = await axios.get("https://api.openai.com/v1/models", config);
    return models.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const handleRequest = async (user) => {
  const decryptedApiKey = await decrypt(user.apiKey);
  return fetchModelsFromAPI(decryptedApiKey);
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await User.findById(session.user.id);
    const models = await handleRequest(user);
    res.status(200).json({ models });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ error: error.message });
  }
}
