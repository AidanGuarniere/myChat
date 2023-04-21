const mongoose = require("mongoose");
require("dotenv").config();
const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return mongoose.connection.db;
  }

  return mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.connection.db);
}

module.exports = dbConnect;
