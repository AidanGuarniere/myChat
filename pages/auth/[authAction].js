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
      handleSignUp(username, password, openAIAPIKey);
    }

    setUsername("");
    setPassword("");
    setOpenAIAPIKey("");
  };
  useRedirectIfAuthenticated();

  function getBorder(field) {
    if (field === "password") {
      return password.length >= 8 ? "border-green-200" : "border-red-600";
    }
    if (field === "username") {
      return username.match(/^[a-zA-Z0-9_]{1,}$/)
        ? "border-green-200"
        : "border-red-600";
    }
    if (field === "apiKey") {
      return openAIAPIKey.match(/^sk-[\w]+$/)
        ? "border-green-200"
        : "border-red-600";
    }
  }

  const checkField = (fields) => {
    const results = {
      username: null,
      password: null,
      apiKey: null,
    };

    if (fields.password) {
      results.password = fields.password.length >= 8;
    }
    if (fields.username) {
      results.username = /^[a-zA-Z0-9_]{1,}$/.test(fields.username);
    }
    if (fields.apiKey) {
      results.apiKey = /^sk-[\w]+$/.test(fields.apiKey);
    }
    return results;
  };

  const toggleSubmitButton = () => {
    let disabled;
    if (isLogin) {
      if (username.length >= 1 && password.length >= 1) {
        disabled = false;
      } else {
        disabled = true;
      }
    } else {
      const results = checkField({
        username: username,
        password: password,
        apiKey: openAIAPIKey,
      });
      if (results.username && results.password && results.apiKey) {
        disabled = false;
      } else {
        disabled = true;
      }
    }
    return disabled;
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-center p-3 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="z-10 bg-gray-100 bg-opacity-90 px-6 py-4 w-5/6 md:w-1/2 xl:w-1/3 mx-auto rounded-xl border border-gray-300 shadow-lg space-y-4 mb-4"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          pattern="^[a-zA-Z0-9_]{1,}$"
          className={`w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border  ${
            !isLogin ? getBorder("username") : "border-green-200"
          } focus:outline-none`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          pattern="^[A-Za-z\d!@#$%^&*_+|;':,.?-]{8,}$"
          minLength={8}
          required
          className={`w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border ${
            !isLogin ? getBorder("password") : "border-green-200"
          }`}
        />
        {password && password.length < 8 && !isLogin && (
          <div className="flex justify-start">
            <span className="text-start text-sm">
              - Password must contain at least 8 characters
            </span>
          </div>
        )}
        {!isLogin && (
          <input
            type="text"
            placeholder="OpenAI API Key"
            value={openAIAPIKey}
            onChange={(event) => setOpenAIAPIKey(event.target.value)}
            required
            pattern="^sk-[\w]+$"
            className={`w-full p-2 mb-4 rounded-md text-gray-900 placeholder-gray-500 focus:border ${getBorder(
              "apiKey"
            )} focus:outline-none`}
          />
        )}
        {openAIAPIKey && !openAIAPIKey.match(/^sk-[\w]+$/) && !isLogin && (
          <div className="flex justify-start">
            <span className="text-start text-sm">
              - A valid OpenAI API key is required for this application to work.{" "}
              <br />- You can generate one{" "}
              <Link
                className="underline text-green-200 hover:text-blue-800 transition-colors duration-200"
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>
            </span>
          </div>
        )}
        <button
          type="submit"
          disabled={toggleSubmitButton()}
          className="w-full p-2 rounded-md text-white btn-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200 shadow-md"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <div className="text-sm text-gray-500">
          {isLogin ? (
            <span>
              If you don&apos;t already have an account,{" "}
              <Link
                href="/auth/signup"
                className="underline text-green-200 hover:text-blue-800 transition-colors duration-200"
              >
                sign up
              </Link>
            </span>
          ) : (
            <>
              <span className="mt-10 text-gray-600">
                If you already have an account,{" "}
                <Link
                  href="/auth/login"
                  className="underline text-green-200 hover:text-blue-800 transition-colors duration-200"
                >
                  login
                </Link>
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
