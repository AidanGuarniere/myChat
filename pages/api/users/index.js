import dbConnect from "../../../utils/dbConnect";
import { User } from "../../../models/UserSchema";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
dbConnect();
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findById(session.user.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      // Handle POST request for creating a new user
      break;
    case "PUT":
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findByIdAndUpdate(session.user.id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findByIdAndDelete(session.user.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
