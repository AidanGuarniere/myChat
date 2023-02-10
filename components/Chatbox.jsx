import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";

function ChatGPTSEO() {
  const [userText, setUserText] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userText.length >= 1) {
      setLoading(true);
      setError({});
      try {
        // Make a request to the Next.js API endpoint
        const response = await axios.post("/api/chat", {
          prompt: userText,
        });

        // Extract the generated text from the response
        const completion = response.data.completion;
        setGptResponse(completion);
        setLoading(false);

        return completion;
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    } else {
      setError("please enter a valid prompt");
    }
  };

  // basic cache logic to show previous answer if present
  // useEffect(() => {
  //   if (gptResponse) {
  //     localStorage.setItem("gpt_response", gptResponse);
  //   }
  // }, [gptResponse]);

  // useEffect(() => {
  //   const cachedResponse = localStorage.getItem("gpt_response");
  //   if (cachedResponse) {
  //     setGptResponse(cachedResponse);
  //   }
  // }, []);

  return (
    <div className="w-5/6 h-auto max-h-100% md:max-w-xl bg-gray-200 rounded-lg shadow-lg p-10 mx-auto overflow-hidden">
      <form className="mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border border-gray-400 p-2 rounded-lg"
          placeholder="Type your message here..."
          required
          value={userText}
          onChange={handleChange}
          minLength="1"
          maxLength="300"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-4 my-3 rounded-lg hover:bg-gray-900"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error.message && (
        <p className="text-red-600 font-medium mb-2">Error: {error.message}</p>
      )}
      {error.code && (
        <p className="text-red-600 font-medium mb-2">
          Error code: {error.code}
        </p>
      )}
      {gptResponse && (
        <div className="bg-white rounded p-4 mt-4 h-auto ">
          <h2 className="text-xl font-medium mb-2">Response:</h2>
          <div className=" md:max-h-14vw overflow-y-auto max-h-120">
            <p className="text-gray-700 break-words px-2 max-h-100%">
              {loading ? "Loading..." : gptResponse}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatGPTSEO;
