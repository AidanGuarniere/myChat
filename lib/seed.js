const mongoose = require("mongoose");
const dbConnect = require("../utils/dbConnect.js");
const User = require("../models/UserSchema");
const { Chat } = require("../models/ChatSchema");

dbConnect();

function createUsers(numUsers) {
  return Array.from({ length: numUsers }, (_, i) => ({
    username: `user${i + 1}`,
    password: `password${i + 1}`,
    apiKey: `apiKey${i + 1}`,
  }));
}

function createChatsForUser(user, numChats) {
  return Array.from({ length: numChats }, (_, i) => ({
    title: `Sample Chat ${i + 1}`,
    user: user._id,
    id: `chatID${user._id}${i}${numChats}${numChats - i}`,
    messages: [
      {
        role: "system",
        content: `You are a helpful LLM AI trained by OpenAI. Knowledge cutoff: 09/2021. Current date: ${Date.now()}`,
        createdAt: new Date(),
      },
      {
        role: "user",
        content: `Hi there, I'm ${user.username}!`,
        createdAt: new Date(),
      },
      {
        role: "assistant",
        content: "How can I help you?",
        createdAt: new Date(),
      },
    ],
  }));
}

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  // Delete existing data
  await User.deleteMany({});
  await Chat.deleteMany({});

  // Generate and insert seed data for users
  const userSeedData = createUsers(5);
  const insertedUsers = await User.insertMany(userSeedData);
  console.log("Inserted", insertedUsers.length, "users");

  // Generate and insert seed data for chats
  const chatSeedData = insertedUsers.flatMap((user) =>
    createChatsForUser(user, 3)
  );
  const insertedChats = await Chat.insertMany(chatSeedData);
  console.log("Inserted", insertedChats.length, "chats");

  mongoose.connection.close();
});
