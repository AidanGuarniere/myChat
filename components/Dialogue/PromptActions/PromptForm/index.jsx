import React, { useRef } from "react";

function PromptForm({ userText, setUserText, handleSubmit, loading }) {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setUserText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="stretch flex flex-col flex-grow w-full">
      <form
        className="flex flex-row gap-3 w-full mx-auto max-w-[96%] md:max-w-md lg:max-w-2xl xl:max-w-3xl mt-2 mb-1 sm:pl-3.5 py-2 sm:py-3.5 pr-0 relative border border-black/10 
                 bg-white rounded-[.4325rem] dark:border-gray-900/50 dark:text-white dark:bg-gray-700 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] sm:min-h-[1rem] "
        onSubmit={(e) => {
          handleSubmit(e);
          textareaRef.current.style.height = "auto";
        }}
        style={{ boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.1)" }}
      >
        <div className="w-full p-0 m-0">
          <textarea
            ref={textareaRef}
            className="resize-none h-full w-full m-0 border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 
                     focus-visible:ring-0 focus:outline-none focus:border-0 dark:bg-transparent md:pl-1 font-mendium align-top placeholder-gray-500"
            tabIndex="0"
            placeholder="Send a message."
            data-id="root"
            value={userText}
            onChange={handleChange}
            minLength="1"
            spellCheck="false"
            rows={1}
            style={{
              minHeight: "1rem",
              fontSize: "1.12rem",
              maxHeight: "10rem",
              lineHeight: "1.5rem",
            }}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>

        <button
          type="submit"
          className={`absolute p-1 rounded-md bottom-1.5 sm:bottom-3 right-1 md:right-2 hover:bg-gray-100 
                    dark:hover:text-gray-300 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent 
                    ${loading ? "loading-icon" : null} ${
            userText.length === 0
              ? "text-gray-300 dark:text-gray-600"
              : "text-gray-500"
          }
                   `}
          disabled={loading || userText.length === 0}
        >
          {!loading && (
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.12rem] w-[1.12rem] mr-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
export default PromptForm;
