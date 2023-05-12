import { dbConnect, dbDisconnect } from "../../../utils/dbConnect.js";
import User from "../../../models/UserSchema";

async function handlePostRequest(req, res) {
  const { username, password, openAIAPIKey } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Signup failed.");
  }

  const newUser = new User({
    username,
    password,
    apiKey: openAIAPIKey,
  });

  await newUser.save();

  return res.status(201).json({
    user: {
      username: newUser.username,
    },
    credentials: {
      username: newUser.username,
      password: req.body.password,
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  await dbConnect();

  try {
    const result = await handlePostRequest(req, res);
    // await dbDisconnect();
    return result;
  } catch (error) {
    // await dbDisconnect();
    return res.status(400).json({ error });
  }
}
