const mongoose = require("mongoose");

const dbConnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    return mongoose;
  }

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;
