import React from "react";

function RegenButton({ handleRegen, loading, showRegen }) {
  
  return (
    showRegen && (
      <div
        className={`flex ml-1 md:w-full md:m-auto gap-0 md:gap-2 justify-center ${
          showRegen && "block"
        } ${loading || (!showRegen && "hidden")}
      }`}
      >
        <button
          onClick={handleRegen}
          className="btn relative btn-neutral border-0 md:border dark:bg-gray-800 dark:text-gray-100"
          fdprocessedid="qe1rko"
          disabled={loading}
        >
          <div className="flex w-full items-center justify-center gap-2">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            Regenerate response
          </div>
        </button>
      </div>
    )
  );
}
export default RegenButton;
