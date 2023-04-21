import Link from "next/link";
import useRedirectIfAuthenticated from "../../hooks/useRedirectIfAuthenticated";

const Auth = () => {
  useRedirectIfAuthenticated();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-4 font-bold">Welcome to myGPT</h1>
      <h2 className="text-2xl">MyGPT is not affiliated with OpenAI in any way.</h2>
      <h2 className="text-2xl">MyGPT is an application that lets you send requests to OpenAI's API and stores your interactions.</h2>
      <h2>A valid OpenAI API key is required for this application to work, if you do not already have one, you can generate one <a className="underline text-green-200 hover:text-blue-800" href="https://platform.openai.com/account/api-keys">here</a></h2>
      <div className="flex space-x-4">
        <Link href="/auth/login">
          <button className="p-2 my-4 w-36 rounded-md text-white btn-primary focus:ring-2 ">
            Login
          </button>
        </Link>
        <Link href="/auth/signup">
          <button className="p-2 my-4 w-36 rounded-md text-white btn-primary focus:ring-2 ">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
