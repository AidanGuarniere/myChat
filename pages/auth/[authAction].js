import { useRouter } from "next/router";
import { useState } from "react";
import { handleSignUp, handleLogin } from "../../utils/authUtils";
import useRedirectIfAuthenticated from "../../hooks/useRedirectIfAuthenticated";
import Link from "next/link";

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
        setOpenAIAPIKey("");
        return;
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
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-center p-3 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="z-10 bg-gray-100 bg-opacity-90 px-6 py-4 w-5/6 md:w-1/2 xl:w-1/3 mx-auto rounded-xl border border-gray-300 shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          pattern="/^[a-zA-Z0-9_]+$/"
          className="w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border focus:border-green-200 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;':&quot;,./?\\-])[A-Za-z\d!@#$%^&*()_+[\]|;':&quot;,./<>?\\-]{8,}$"
          minLength={8}
          required
          className="w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border focus:border-green-200 focus:outline-none"
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="OpenAI API Key"
            value={openAIAPIKey}
            onChange={(event) => setOpenAIAPIKey(event.target.value)}
            required
            pattern="/^sk-[\w]+$/"
            className="w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border focus:border-green-200 focus:outline-none"
          />
        )}
        <button
          type="submit"
          className="w-full p-2 rounded-md text-white btn-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200 shadow-md"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <div className="text-sm text-gray-500">
          {isLogin ? (
            <span>
              If you don&apos;t already have an account,
              <Link
                href="/auth/signup"
                className="underline text-green-200 hover:text-blue-800 transition-colors duration-200"
              >
                sign up
              </Link>
            </span>
          ) : (
            <span>
              If you already have an account,
              <Link
                href="/auth/login"
                className="underline text-green-200 hover:text-blue-800 transition-colors duration-200"
              >
                login
              </Link>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
