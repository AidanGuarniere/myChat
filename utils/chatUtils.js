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

export const fetchChatTitles = async () => {
  try {
    const response = await axios.get("/api/chats", {
      params: { fields: "id,title" },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
  return [];
};

// Fetches a specific chat by id
export const fetchChatById = async (chatId) => {
  try {
    const response = await axios.get(`/api/chats/${chatId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw error;
  }
  return null;
};

// Deletes all chats or a specific chat by id
export const deleteChats = async (chatId) => {
  try {
    if (chatId) {
      await axios.delete(`/api/chats/${chatId}`);
    } else {
      await axios.delete("/api/chats");
    }
  } catch (error) {
    console.error("Error deleting chat(s):", error);
    throw error;
  }
};

// Creates a new chat with the given data
export const createChat = async (chatData) => {
  try {
    const response = await axios.post("/api/chats", chatData);
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

// Updates an existing chat with the given data
export const updateChat = async (chatId, updatedChatData) => {
  try {
    if (chatId) {
      const response = await axios.put(`/api/chats/${chatId}`, updatedChatData);
      return response.data;
    } else {
      throw new Error("ID is required");
    }
  } catch (error) {
    console.error("Error updating chat:", error);
    throw error;
  }
};
