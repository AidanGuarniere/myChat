const mongoose = require("mongoose");

async function dbConnect() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose;
  }

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function dbDisconnect() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect();
  }
}

module.exports = { dbConnect, dbDisconnect };
