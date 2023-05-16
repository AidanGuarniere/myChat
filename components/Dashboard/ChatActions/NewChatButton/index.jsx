import React from "react";

function NewChatButton({ setSelectedChat }) {
  return (
    <div className="p-2 md:p-[.55rem]">
      <button
        className="dashboard-text w-full flex md:mb-0 p-[.775rem] items-center gap-3 rounded-[.425rem] hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer flex-shrink-0 border border-white/20"
        onClick={() => {
          setSelectedChat(null);
        }}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New chat
      </button>
    </div>
  );
}

export default NewChatButton;
