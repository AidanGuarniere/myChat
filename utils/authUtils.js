// utils/authUtils.js
import { signIn, getCsrfToken } from "next-auth/react";

export async function handleSignUp(username, password, openAIAPIKey) {
  try {
    const csrfToken = await getCsrfToken();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },

      body: JSON.stringify({ username, password, openAIAPIKey }),
    });
    if (response.ok) {
      const data = await response.json();
      // Sign the user in after successful signup
      const signInResult = await signIn("credentials", {
        username: data.user.username,
        password: password,
        callbackUrl: "/",
        redirect: false,
      });

      if (!signInResult.ok) {
        console.error("B Sign in failed:", signInResult.error);
      }
    } else {
      const errorData = await response.json();
      console.error("A Signup failed:", errorData.error);
    }
  } catch (error) {
    console.error("An error occurred during signup:", error);
  }
}

export const handleLogin = async (username, password) => {
  try {
    const signInResult = await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    if (!signInResult.ok) {
      console.error("Error logging in:", signInResult.error);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
