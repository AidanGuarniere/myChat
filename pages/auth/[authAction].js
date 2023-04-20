import { useRouter } from "next/router";
import { useState } from "react";
import { handleSignUp, handleLogin } from "../../utils/authUtils";
import useRedirectIfAuthenticated from "../../hooks/useRedirectIfAuthenticated";

const AuthForm = () => {
  const router = useRouter();
  const { authAction } = router.query;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openAIAPIKey, setOpenAIAPIKey] = useState("");

  const isLogin = authAction === "login";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      handleLogin(username, password, openAIAPIKey);
    } else {
      if (!openAIAPIKey.match(/^sk-[\w]+$/)) {
        alert("Invalid API key format.");
        setUsername("")
        setPassword("")
        setOpenAIAPIKey("")
        return
      }
      handleSignUp(username, password, openAIAPIKey);
    }

    setUsername("");
    setPassword("");
    setOpenAIAPIKey("");
  };
  useRedirectIfAuthenticated();

  // Render the appropriate form based on the action
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 w-full md:w-1/2 xl:w-1/3 rounded-lg"
      >
        <h1 className="text-dark text-center text-2xl mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          className="w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border focus:border-green-200 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border focus:border-green-200 focus:outline-none"
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Please enter your OpenAI API Key"
            value={openAIAPIKey}
            onChange={(event) => setOpenAIAPIKey(event.target.value)}
            required
            className="w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border focus:border-green-200 focus:outline-none"
          />
        )}
        <button
          type="submit"
          className="w-full p-2 rounded-md text-white btn-primary focus:border focus:border-green-200 focus:outline-none "
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <div className="mt-4 text-dark">
        {isLogin ? (
          <span>
            If you don't already have an account,{" "}
            <a
              href="/auth/signup"
              className="underline text-green-200 hover:text-blue-800"
            >
              sign up here
            </a>
          </span>
        ) : (
          <span>
            If you already have an account,{" "}
            <a
              href="/auth/login"
              className="underline text-green-200 hover:text-blue-800"
            >
              login here
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
