import React, { useState, useEffect } from "react";

function CopyButton({ text, copyMessage }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    setInterval(() => {
      setCopied(false);
    }, 3000);
  }, [copied === true]);
  return (
    <div className="absolute bottom-0 md:top-0 right-0 rounded text-gray-400 hover:text-gray-300 hover:bg-gray-700">
      <button
        className="md:gap-3 lg:gap-1 lg:mb-0 p-1 "
        onClick={() => {
          handleCopyClick();
        }}
      >
        {copied ? (
          <>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.1rem] w-[1.1rem]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {copyMessage?.postCopy && copyMessage.postCopy}
          </>
        ) : (
          <>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.1rem] w-[1.1rem]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            {copyMessage?.preCopy && copyMessage.preCopy}
          </>
        )}
      </button>
    </div>
  );
}

export default CopyButton;
