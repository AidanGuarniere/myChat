import React, { useState, useEffect } from "react";
import axios from "axios";
import ConversationHistory from "./ConversationHistory";

function ChatGPTChatbox() {
  const [userText, setUserText] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
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
    if (!loading) {
      setSelectedConversation(conversations.length - 1);
    }
  }, [loading]);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  return (
    <div className=" w-screen h-screen h-auto max-h-100% bg-gray-200  p-10 mx-auto overflow-y-auto">
      {error.message && (
        <p className="text-red-600 font-medium mb-2">Error: {error.message}</p>
      )}
      {error.code && (
        <p className="text-red-600 font-medium mb-2">
          Error code: {error.code}
        </p>
      )}
      <div className="flex">
        <ConversationHistory
          conversations={conversations}
          setUserText={setUserText}
          setSelectedConversation={setSelectedConversation}
        />
        <div className="w-3/4 h-auto max-h-100% bg-gray-200 rounded-lg shadow-lg p-10 ml-2 overflow-hidden">
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
          {conversations.length > 0 ? (
            <div className="conversation">
              {selectedConversation !== null &&
              conversations[selectedConversation] ? (
                <div className="bg-white rounded p-4 mt-4 h-auto">
                  <div className="conversation-item" key={selectedConversation}>
                    <div className="bg-white rounded p-4 mt-4 h-auto">
                      {selectedConversation === 0 ? (
                        <div>
                          {" "}
                          <p className="text-black-700 font-bold break-words px-2 max-h-100%">
                            {conversations[0].prompt}
                          </p>
                          <p className="text-gray-700 break-words px-2 max-h-100%">
                            {conversations[selectedConversation]
                              ? conversations[0].response
                              : "Loading..."}
                          </p>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          {selectedConversation && (
                            <p className="text-black-700 font-bold break-words px-2 max-h-100%">
                              {conversations[selectedConversation].prompt}
                            </p>
                          )}
                          {selectedConversation && (
                            <p className="text-gray-700 break-words px-2 max-h-100%">
                              {conversations[selectedConversation]
                                ? conversations[selectedConversation].response
                                : "Loading..."}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="conversation-history">
                  <h2 className="text-xl font-medium mb-2">
                    Start a Conversation:
                  </h2>
                  <div className="bg-white rounded p-4 mt-4 h-auto">
                    <div
                      className="conversation-item"
                      key={selectedConversation}
                    >
                      <div className="bg-white rounded p-4 mt-4 h-auto">
                        <p className="text-gray-700 break-words px-2 max-h-100%"></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ChatGPTChatbox;
