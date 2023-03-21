const mongoose = require("mongoose");
require("dotenv").config()
const connection = {};

async function dbConnect() {
  // If there's an existing connection, return it
  if (connection.isConnected) {
    return;
  }

  // If no existing connection, create a new one
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

module.exports = dbConnect;
