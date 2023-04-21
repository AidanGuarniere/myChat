import dbConnect from "../../utils/dbConnect.js";
import { Chat } from "../../models/ChatSchema";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = session.user.id;
  switch (method) {
    case "GET":
      try {
        const userChats = await Chat.find({ userId });
        res.status(200).json(userChats);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }

      break;
    case "POST":
      try {
        const { id, title, messages } = req.body;

        if (id) {
          let updatedChat = await Chat.findOneAndUpdate(
            { id, userId },
            { messages: messages },
            { new: true }
          );

          if (!updatedChat) {
            updatedChat = await Chat.create({ id, userId, title, messages });
            return res.status(201).json(updatedChat);
          }

          return res.status(200).json(updatedChat);
        } else {
          const newChat = await Chat.create({ userId, title, messages });
          return res.status(201).json(newChat);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    case "PUT":
      try {
        const { id, title, messages } = req.body;

        if (id) {
          const updateData = {};
          if (title) updateData.title = title;
          if (messages) updateData.messages = messages;

          const updatedChat = await Chat.findOneAndUpdate(
            { id, userId },
            updateData,
            { new: true }
          );

          if (!updatedChat) {
            return res.status(404).json({ error: "Chat not found" });
          }

          return res.status(200).json(updatedChat);
        } else {
          return res.status(400).json({ error: "ID is required" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        if (id) {
          const deletedChat = await Chat.deleteOne({ id, userId });
          res.status(200).json(deletedChat);
        } else {
          const deletedChat = await Chat.deleteMany();
          res.status(200).json(deletedChat);

        }
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
