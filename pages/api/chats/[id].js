import dbConnect from "../../../utils/dbConnect";
import { Chat } from "../../../models/ChatSchema";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import rateLimiter from "../../../utils/rateLimiter";

async function handleGetRequest(req, res, userId, selectedChatId) {
  const selectedChat = await Chat.findOne({
    _id: selectedChatId,
    userId,
  });

  if (!selectedChat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  res.status(200).json(selectedChat);
}

async function handlePutRequest(req, res, userId, selectedChatId) {
  const { title, messages, model } = req.body;
  const updateData = {};
  if (title) updateData.title = title;
  if (messages) updateData.messages = messages;
  if (model) updateData.model = model;

  const updatedChat = await Chat.findOneAndUpdate(
    { _id: selectedChatId, userId },
    updateData,
    { new: true }
  );

  if (!updatedChat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  res.status(200).json(updatedChat);
}

async function handleDeleteRequest(req, res, userId, selectedChatId) {
  const deletedChat = await Chat.deleteOne({
    _id: selectedChatId,
    userId,
  });
  res.status(200).json(deletedChat);
}

export default async function handler(req, res) {
  const { method } = req;
  const { id: selectedChatId } = req.query;

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
        await handleGetRequest(req, res, userId, selectedChatId);
        break;
      case "PUT":
        await handlePutRequest(req, res, userId, selectedChatId);
        break;
      case "DELETE":
        await handleDeleteRequest(req, res, userId, selectedChatId);
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
