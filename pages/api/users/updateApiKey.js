// /pages/api/users/update-api-key.js
import dbConnect from "../../../utils/dbConnect";
import  User  from "../../../models/UserSchema";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { newApiKey } = req.body;
    if (!newApiKey) {
      return res.status(400).json({ error: "New API key is required" });
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { apiKey: newApiKey },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: { username: user.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
