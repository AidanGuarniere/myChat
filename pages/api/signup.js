import { nanoid } from "nanoid";
import dbConnect from "../../utils/dbConnect.js";
import User from "../../models/UserSchema";

//u removed id, pretty sure u dont need it

export default async function handler(req, res) {
  dbConnect();

  if (req.method === "POST") {
    // Extract user data from the request
    const { username, password, openAIAPIKey } = req.body;
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Signup failed." });
      }

      // Create a new user
      const newUser = new User({
        username,
        password, // Provide plain-text password
        apiKey: openAIAPIKey,
      });
      // Save the new user
      await newUser.save();

      // Return the created user (without the password)
      return res.status(201).json({
        user: {
          username: newUser.username,
          apiKey: newUser.apiKey,
        },
        credentials: {
          username: newUser.username,
          password: req.body.password,
        },
      });
    } catch (error) {
      res.status(400).json({ error: "Signup failed." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
