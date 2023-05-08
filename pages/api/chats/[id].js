import dbConnect from "../../../utils/dbConnect";
import { Chat } from "../../../models/ChatSchema";
import { authOptions } from "../auth/[...nextauth]";
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
  const { id: selectedChatId } = req.query;

  switch (method) {
    case "GET":
      try {
        const selectedChat = await Chat.findOne({
          _id: selectedChatId,
          userId,
        });
        if (!selectedChat) {
          return res.status(404).json({ error: "Chat not found" });
        }
        return res.status(200).json(selectedChat);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    case "PUT":
      try {
        const { title, messages } = req.body;

        if (selectedChatId) {
          const updateData = {};
          if (title) updateData.title = title;
          if (messages) updateData.messages = messages;

          const updatedChat = await Chat.findOneAndUpdate(
            { _id: selectedChatId, userId },
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
        if (selectedChatId) {
          const deletedChat = await Chat.deleteOne({
            _id: selectedChatId,
            userId,
          });
          res.status(200).json(deletedChat);
        }
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
