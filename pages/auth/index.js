import Link from "next/link";
import useRedirectIfAuthenticated from "../../hooks/useRedirectIfAuthenticated";
import Image from "next/image";

const Auth = () => {
  useRedirectIfAuthenticated();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-center p-3">
      <div className="h-4/5 flex flex-col items-center justify-center z-10 bg-gray-100 bg-opacity-90 p-6 rounded-xl border border-gray-300 shadow-lg w-5/6 sm:w-3/5 space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to MyGPT</h1>
        <h2 className="text-3xl font-semibold text-gray-700">
          MyGPT is not affiliated with OpenAI in any way.
        </h2>
        <h2 className="text-lg text-gray-600">
          MyGPT is an open source project modeled after ChatGPT. MyGPT may
          produce inaccurate information.
        </h2>
        <h2 className="text-md text-gray-500">
          A valid OpenAI API key is required for this application to work, if
          you do not already have one, you can generate one{" "}
          <a
            className="underline text-green-200 hover:text-blue-800 transition-colors duration-200"
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </h2>
        <div className="flex space-x-4 justify-center">
          <Link href="/auth/login">
            <button className="p-2 my-4 w-28 sm:w-36 rounded-md text-white btn-primary focus:ring-2 shadow-md">
              Login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="p-2 my-4 w-28 sm:w-36 rounded-md text-white btn-primary focus:ring-2 shadow-md">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
