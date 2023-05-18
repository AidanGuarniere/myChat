import Link from "next/link";
import useRedirectIfAuthenticated from "../../hooks/useRedirectIfAuthenticated";
import Image from "next/image";

const Auth = () => {
  useRedirectIfAuthenticated();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center p-3 overflow-hidden">
      {/* bg-gradient-to-t from-gray-200 via-gray-100 to-green-200 animate-gradient-x" */}
      <div className="z-10 min-h-2/3 flex flex-col justify-center items-center p-6 sm:p-8 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl w-5/6 sm:w-3/5 transform transition-all duration-500 hover:scale-105 bg-gray-100 bg-opacity-90">
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 font-light text-gray-900 my-6 ">
          Welcome to MyChat
        </h1>
        <h2 className="text-lg lg:text-xl text-gray-900">
          MyChat is an open source project modeled after ChatGPT.
          <br />
          MyChat may produce inaccurate information.
        </h2>

        <div className="w-full flex space-x-2 md:space-x-4 justify-center">
          <Link href="/auth/login">
            <button className="p-2 my-4 w-24 md:w-28 sm:w-36 rounded-md text-white btn-primary">
              Login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="p-2 my-4 w-24 md:w-28 sm:w-36 rounded-md text-white btn-primary">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
