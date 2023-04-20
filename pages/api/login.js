const dbConnect = require("../../utils/dbConnect.js");
const  User  = require("../../models/UserSchema");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    await dbConnect();

    try {
      const user = await User.findOne({ username });

      if (!user || user.password !== password) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      res.status(200).json({ message: 'User authenticated', user });
    } catch (error) {
      res.status(500).json({ message: 'Error authenticating user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
