const mongoose = require("mongoose");
const dbConnect = require("../utils/dbConnect.js");
const Chat = require("../models/ChatSchema");
const User = require("../models/UserSchema");

dbConnect();

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  // Insert messages
  const seedData = [
    {
      id: "1",
      title: "Sample Chat",
      messages: [
        {
          role: "system",
          content: "Welcome to the chat!",
          createdAt: new Date(),
        },
        {
          role: "user",
          content: "Hi there!",
          createdAt: new Date(),
        },
        {
          role: "assistant",
          content: "How can I help you?",
          createdAt: new Date(),
        },
      ],
    },
  ];

  await Chat.deleteMany({});

  const insertedChats = await Chat.insertMany(seedData);

  console.log("Inserted", insertedChats.length, "chats");

  // Insert user with seed conversations
  const userData = {
    id: "1",
    username: "sampleUser",
    password: "samplePassword",
    apiKey: "sampleApiKey",
    conversations: insertedChats,
  };

  await User.deleteMany({});

  const insertedUser = await User.create(userData);

  console.log("Inserted user with id", insertedUser.id);

  mongoose.connection.close();
});

