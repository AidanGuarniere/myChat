import React, { useState, useRef, useEffect } from "react";

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
      const response = await fetch("/api/users/updateApiKey", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newApiKey: apiKeyInputValue,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        await update({
          apiKey: updatedUser.apiKey,
        });
        setShowApiKeyInput(false);
      } 
    } catch (error) {
      setError("Error updating API key:", error);
    }
  };

  const handleApiKeySubmitClick = (e) => {
    const isEditButton = e.target.id === "show-api-key-input";
    const isSubmitButton = e.target.id === "submit-api-key-edit";

    if (!isEditButton && !isSubmitButton) {
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
      // document.removeEventListener("click", handleDocumentClick);
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
      className="text-left flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 text-white text-sm hover:bg-gray-500/10 transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        height="1em"
        width="1em"
      >
        <path d="M7 7a5 5 0 0 1 9.9 1H23v4h-1.9c-.6 1.5-1.7 2.8-3.2 3.5-1.4.7-3.1 1.1-4.9 1-3.5-.3-6.3-3.1-6.7-6.6V7zm5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
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
        <div
          className="absolute flex right-1 z-10 text-gray-300 visible"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            id="submit-api-key-edit"
            className="p-1 hover:text-white"
            onClick={() => {
              if (session.user.apiKey !== apiKeyInputValue) {
                handleEditApiKey(apiKeyInputValue);
              }
              setShowApiKeyInput(false);
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
          <button
            className="p-1 hover:text-white"
            onClick={() => setShowApiKeyInput(false)}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </a>
  );
}

export default ApiKeyInput;
