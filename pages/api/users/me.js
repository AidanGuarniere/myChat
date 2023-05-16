import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/UserSchema";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import rateLimiter from "../../../utils/rateLimiter";


async function handleGetRequest(req, res, userId) {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ user: { username: user.username } });
}

async function handlePutRequest(req, res, userId) {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const whitelist = ["apiKey"];
  for (let field in req.body) {
    if (whitelist.includes(field)) {
      user[field] = req.body[field];
    }
  }

  await user.save();

  res.status(200).json({ user: { username: user.username } });
}

async function handleDeleteRequest(req, res, userId) {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(204).end();
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
      case "PUT":
        await handlePutRequest(req, res, userId);
        break;
      case "DELETE":
        await handleDeleteRequest(req, res, userId);
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
