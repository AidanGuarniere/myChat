import { getSession } from "next-auth/react";
const updateUserApiKey = async () => {
    // Call your API route to update the user's API key
    const response = await fetch("/api/users/update-api-key", {
      method: "PUT",
      body: JSON.stringify({ newApiKey: newGeneratedApiKey }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      // Refetch the session data
      await getSession();
    } else {
      // Handle the error
    }
  };
  