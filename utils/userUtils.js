import axios from "axios";

export const updateUser = async (userData) => {
  try {
    const response = await axios.put("/api/users/me", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
