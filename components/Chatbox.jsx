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

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

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

        const completion = response.data.completion;

        // If there is no selected conversation, start a new one
        if (!selectedConversation) {
          const newConversation = {
            id: completion.id,
            title: userText,
            dialogue: [
              {
                prompt: userText,
                response: completion.choices[0].message.content,
              },
            ],
          };
          setConversations([...conversations, newConversation]);
          setSelectedConversation(newConversation.id);
        } else {
          // If there is a selected conversation, add the new prompt and response to it
          const updatedConversations = [...conversations];
          const selectedIndex = updatedConversations.findIndex(
            (conversation) => conversation.id === selectedConversation
          );
          updatedConversations[selectedIndex].dialogue.push({
            prompt: userText,
            response: completion.choices[0].message.content,
          });
          setConversations(updatedConversations);
        }

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

  // useEffect(() => {
  //   if (!loading) {
  //     setSelectedConversation(
  //       conversations.length > 0
  //         ? conversations[conversations.length - 1].id
  //         : null
  //     );
  //   }
  // }, [loading]);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  return (
    <div className=" w-screen h-screen  mx-auto overflow-hidden">
      {error.message && (
        <p className="text-red-600 font-medium mb-2">Error: {error.message}</p>
      )}
      {error.code && (
        <p className="text-red-600 font-medium mb-2">
          Error code: {error.code}
        </p>
      )}
      <div className="flex overflow-x-hidden items-bottom">
        <ConversationHistory
          conversations={conversations}
          userText={userText}
          setUserText={setUserText}
          setSelectedConversation={setSelectedConversation}
        />
        <div className="w-4/5 h-screen bg-gray-200  p-0 m-0 overflow-x-hidden overflow-y-scroll">
          <div className="conversation">
            {selectedConversation !== null &&
            conversations[
              conversations.findIndex(
                (conversation) => conversation.id === selectedConversation
              )
            ] ? (
              <div className="bg-white rounded overflow-y-scroll p-0">
                <div className="conversation-item" key={selectedConversation}>
                  <div className="bg-white rounded  min-h-80">
                    {/* <p className="text-black-700 text-lg font-bold break-words p-4">
                      {
                        conversations[
                          conversations.findIndex(
                            (conversation) =>
                              conversation.id === selectedConversation
                          )
                        ].title
                      }
                    </p> */}
                    {conversations[
                      conversations.findIndex(
                        (conversation) =>
                          conversation.id === selectedConversation
                      )
                    ].dialogue.map((dialogue, index) => (
                      <div key={index}>
                        <div className="p-4 bg-gray-200 break-words">
                          {dialogue.prompt}
                        </div>
                        <div className="p-4 bg-gray-100 break-words">
                          {dialogue.response}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="conversation-history">
                {/* <h2 className="text-xl font-medium mb-2 ml-2">
                  Start a Conversation:
                </h2> */}
                <div className="bg-white rounded p-4 h-auto">
                  <div className="bg-white rounded p-4">
                    <p className="text-gray-700 break-words px-2 max-h-100%"></p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form
            className="mt-4  fixed bottom-0 px-1 pt-4 w-4/5 fade"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="w-full border border-gray-400 p-2 rounded-lg h-auto resize-y"
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
        </div>
      </div>
    </div>
  );
}
export default ChatGPTChatbox;
