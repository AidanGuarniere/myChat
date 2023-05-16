import React, { useState, useRef, useEffect } from "react";
import ConfirmAction from "../../ConfirmAction";
import { updateUser } from "../../../../utils/userUtils";

function ApiKeyInput({ session, update, setError }) {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyInputValue, setApiKeyInputValue] = useState("");
  const inputRef = useRef(null);

  const handleEditApiKey = async () => {
    if (!apiKeyInputValue.match(/^sk-[\w]+$/)) {
      setApiKeyInputValue("");
      return;
    }
  
    try {
      await updateUser({ apiKey: apiKeyInputValue });
      setShowApiKeyInput(false);
      setApiKeyInputValue("");
    } catch (error) {
      setError("Error updating API key:", error);
    }
  };
  
  

  const handleApiKeySubmitClick = (e) => {
    const isEditButton = e.target.id === "show-api-key-input";
    const isConfirmActionButton = e.target.id === "confirm-action-button";

    if (!isEditButton && !isConfirmActionButton) {
      setShowApiKeyInput(false);
    }
  };

  useEffect(() => {
    if (showApiKeyInput) {
      document.addEventListener("click", handleApiKeySubmitClick);
    } else {
      document.removeEventListener("click", handleApiKeySubmitClick);
    }
    return () => {
      document.removeEventListener("click", handleApiKeySubmitClick);
    };
  }, [showApiKeyInput]);
  return (
    <a
      type="button"
      id="show-api-key-input"
      onClick={() => {
        if (!showApiKeyInput) {
          setShowApiKeyInput(true);
        }
      }}
      className="text-left flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 text-white hover:bg-gray-500/10 transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        height="1em"
        width="1em"
      >
        <path d="M5 5a4 4 0 1 1 0 8 4 4 0 0 1 0 -8Z M10 9h9"></path>
        <path d="M13 9v4"></path>
        <path d="M16 9v2"></path>
        <path d="M19 9v4"></path>
      </svg>

      {showApiKeyInput ? (
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your new API key"
          className="content h-5 w-full bg-transparent text-white border-none outline-none focus:outline-blue-600 border-[1.5px]  pb-1"
          value={apiKeyInputValue}
          autoFocus
          onChange={(e) => setApiKeyInputValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        ></input>
      ) : (
        <span
          className="text-left whitespace-normal break-words overflow-y-scroll"
          style={{ pointerEvents: "none" }}
        >
          Edit your API key
        </span>
      )}
      {showApiKeyInput && (
        <ConfirmAction
          confirmAction={() => {
            handleEditApiKey(apiKeyInputValue);
            setShowApiKeyInput(false);
          }}
          denyAction={() => setShowApiKeyInput(false)}
        />
      )}
    </a>
  );
}

export default ApiKeyInput;
