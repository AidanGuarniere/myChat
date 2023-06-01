import dbConnect from "../../../utils/dbConnect";
import { Chat } from "../../../models/ChatSchema";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import rateLimiter from "../../../utils/rateLimiter";

async function handleGetRequest(req, res, userId) {
  const { fields } = req.query;
  let userChats;

  // if fields are specified, return only those fields
  if (fields) {
    const whitelist = ["id", "title", "model"];
    const fieldList = fields
      .split(",")
      .filter((field) => whitelist.includes(field));
    userChats = await Chat.find({ userId }, fieldList.join(" "));
  } else {
    userChats = await Chat.find({ userId });
  }

  res.status(200).json(userChats);
}

async function handlePostRequest(req, res, userId) {
  const { title, messages, model } = req.body;
  const newChat = await Chat.create({ userId, title, messages, model });
  res.status(201).json(newChat);
}

async function handleDeleteRequest(res) {
  const deletedChat = await Chat.deleteMany();
  res.status(200).json(deletedChat);
}

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = session.user.id;
  try {
    await rateLimiter(userId);
  } catch (err) {
    return res.status(429).json({ error: "Too many requests" });
  }

  try {
    switch (method) {
      case "GET":
        await handleGetRequest(req, res, userId);
        break;
      case "POST":
        await handlePostRequest(req, res, userId);
        break;
      case "DELETE":
        await handleDeleteRequest(res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
