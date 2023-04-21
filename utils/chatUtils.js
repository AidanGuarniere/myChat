import axios from "axios";

// Fetches all chats
export const fetchChats = async () => {
  try {
    const response = await axios.get("/api/chats");
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
  return [];
};


// Deletes all chats or a specific chat by id
export const deleteChats = async (id) => {
  if (id) {
    await axios.delete("/api/chats", { data: { id } });
  } else {
    await axios.delete("/api/chats");
  }
};

// Creates a new chat with the given data
export const createChat = async (chatData) => {
  try {
    const response = await axios.post("/api/chats", chatData);
    // fetchChats()
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

// Updates an existing chat with the given data
export const updateChat = async (updatedChatData) => {
  try {
    const response = await axios.put("/api/chats", updatedChatData);
    // fetchChats()
    return response.data;
  } catch (error) {
    console.error("Error updating chat:", error);
    throw error;
  }
};
