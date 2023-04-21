import React from "react";

function PromptForm({ userText, setUserText, handleSubmit, loading }) {
  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      className="flex flex-col flex-grow mx-auto my-2 py-3 px-3 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md md:max-w-2xl lg:max-w-3xl md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl"
      onSubmit={handleSubmit}
      style={{ boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.1)" }}
    >
      <div className="w-full p-0 m-0">
      <div className="w-full p-0 m-0">
          <textarea
            className="resize-none h-full w-full m-0 overflow-hidden border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 focus:outline-none focus:border-0 dark:bg-transparent md:pl-1 text-base align-top"
            tabIndex="0"
            data-id="root"
            value={userText}
            onChange={handleChange}
            minLength="1"
            spellCheck="false"
            rows={1}
            style={{
              minHeight: "1rem",
              fontSize: "1rem",
              maxHeight: "10rem",
              lineHeight: "1.5rem",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className={`absolute p-1 rounded-md  bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent ${
          loading ? "loading-icon" : null
        } ${userText.length === 0 ? "text-gray-300" : "text-gray-500"}`}
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
            className="h-4 w-4 mr-1"
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
  );
}
export default PromptForm;
