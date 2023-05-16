import React, { useEffect } from "react";

function ErrorDisplay({ error, setError }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex justify-center w-full dark:bg-gray-800">
      <div className="text-base md:max-w-xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
        <div className="flex w-full">
          <div className="py-4 px-3 border text-gray-600 rounded-md text-base dark:text-gray-100 border-red-500 bg-red-500/10 w-5/6 text-center mx-auto">
            <span className="text-2xl">
              Error code: <span className=" font-bold">{error.code}</span>
            </span>
            <p className="mt-2">
              An error occurred. Either the engine you requested does not exist
              or there was another issue processing your request. If this issue
              persists please contact us through our help center at
              helpcenter.example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorDisplay;
