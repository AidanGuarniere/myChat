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

  switch (method) {
    case "GET":
      try {
        const userChats = await Chat.find({ userId }, "id title");
        res.status(200).json(userChats);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
