import React, { useState, useEffect } from "react";
import axios from "axios";
import ConversationList from "./ConversationList";

function ChatGPTChatbox() {
  const [userText, setUserText] = useState("");
  const [conversations, setConversations] = useState([]);
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
        // Make a request to the OpenAI API
        const response = await axios.post("/api/chat", {
          prompt: userText,
        });

        // Extract the generated text from the response
        const completion = response.data.completion;
        setConversations([
          ...conversations,
          { prompt: userText, response: completion },
        ]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    } else {
      setError("Please enter a valid prompt");
    }
  };

  // Use local storage to persist conversation history
  useEffect(() => {
    const storedConversations = localStorage.getItem("conversations");
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  return (
    <div className="w-3/4 h-auto max-h-100% bg-gray-200 rounded-lg shadow-lg p-10 mx-auto overflow-y-auto">
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
      <div className="conversation-container overflow-y-auto">
        <ConversationList conversations={conversations} loading={loading} />
      </div>
    </div>
  );
}
export default ChatGPTChatbox;
