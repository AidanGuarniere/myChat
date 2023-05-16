import React from "react";

function ConfirmAction({ confirmAction, denyAction }) {
  return (
    <div
      className="absolute flex right-1 z-10 text-gray-300 visible"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        id={"confirm-action-button"}
        className="p-1 hover:text-white"
        onClick={confirmAction}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[1.125rem] w-[1.125rem]"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
      <button
        id={"deny-action-button"}
        className="p-1 hover:text-white"
        onClick={denyAction}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[1.125rem] w-[1.125rem]"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}

export default ConfirmAction;
