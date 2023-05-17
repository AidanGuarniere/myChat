import React from "react";

function Footer() {
  return (
    <div className="md:pl-[289px] relative bottom-[5.5rem] md:bottom-14 left-0 w-full md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
      <div className="h-14 w-4/5 flex justify-center items-start sm:items-center mx-auto">
        <span className="text-[.625rem] sm:text-[.75rem] text-gray-600 dark:text-gray-300 text-center">
          MyGPT is not affiliated with OpenAI. MyGPT is an open source project
          modeled after ChatGPT. MyGPT may produce inaccurate information.
        </span>
      </div>
    </div>
  );
}

export default Footer;
