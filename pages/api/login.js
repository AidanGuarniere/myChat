const dbConnect = require("../../utils/dbConnect.js");
const User = require("../../models/UserSchema");
const bcrypt = require("bcrypt")
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    await dbConnect();

    try {
      const user = await User.findOne({ username });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Signup failed." });
      }

      res
        .status(200)
        .json({
          message: "User authenticated",
          user: { username: user.username },
        });
    } catch (error) {
       res.status(400).json({ error: "Signup failed." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
