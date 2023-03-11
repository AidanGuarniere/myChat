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

  // useEffect(() => {
  //   console.log("CONVERSATIONS STATE");
  //   console.log(conversations);
  // }, [conversations]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userText.length >= 1) {
      setLoading(true);
      setError({});
      try {
        let messageHistory;
        // Make a request to the OpenAI API
        if (selectedConversation) {
          // if prev conversation is selected, find it via the index of  conversations that has an id that matches selectedConversation
          const selectedIndex = conversations.findIndex(
            (conversation) => conversation.id === selectedConversation
          );
          // selected conversation object
          const updatedConversation = { ...conversations[selectedIndex] };
          console.log("SELECTED");
          console.log(updatedConversation);

          // add new user message to conversation messages
          updatedConversation.messages.push({
            role: "user",
            content: userText,
          });

          // update messageHistory
          messageHistory = updatedConversation.messages;
        } else {
          // if no conversation is selected, start message history with first user prompt
          console.log("UNSELECTED");
          messageHistory = [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: userText,
            },
          ];
        }

        // make openAI API request with existing messageHistory
        const response = await axios.post("/api/chat", {
          messages: messageHistory,
        });

        // recieve response data as completion
        const completion = response.data.completion;
        console.log("COMPLETION");
        console.log(completion);

        // update messageHistory with completion reponse's message
        messageHistory.push(completion.choices[0].message);
        console.log("HISTORY");
        console.log(messageHistory);
        // If there is no selected conversation, start a new one
        if (!selectedConversation) {
          const newConversation = {
            id: completion.id,
            title: userText,
            messages: messageHistory,
          };
          // add new conversation to conversations array
          setConversations([...conversations, newConversation]);
          // set selectedConversation to most recent conversation
          setSelectedConversation(newConversation.id);
        } else {
          // If there is a selected conversation, find associated conversation object
          const updatedConversations = [...conversations];
          const selectedIndex = updatedConversations.findIndex(
            (conversation) => conversation.id === selectedConversation
          );

          // set messages to updated messageHistory
          updatedConversations[selectedIndex].messages = messageHistory;
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
    <div className="w-screen h-screen mx-auto overflow-hidden bg-gray-100 p-0">
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
        <div className="w-4/5 h-screen p-0 m-0 overflow-x-hidden ">
          <div className="conversation h-full overflow-y-scroll m-0 p-0 flex">
            {selectedConversation !== null &&
            conversations[
              conversations.findIndex(
                (conversation) => conversation.id === selectedConversation
              )
            ] ? (
              <div className="bg-white overflow-y-scroll p-0 w-full h-full">
                <div className="bg-white h-full" key={selectedConversation}>
                  {conversations[
                    conversations.findIndex(
                      (conversation) => conversation.id === selectedConversation
                    )
                  ].messages.map((message, index) =>
                    message.role === "system" ? null : (
                      <p
                        key={index}
                        className={`py-6 px-14 ${
                          message.role === "user"
                            ? "bg-gray-200"
                            : "bg-gray-100"
                        } break-words`}
                      >
                        {message.role === "assistant" ? <span className="font-semibold">ChatGPT: </span> : null}
                        {message.content}
                      </p>
                    )
                  )}
                  <div className="bg-gray-100  h-1/5" />
                </div>
              </div>
            ) : (
              <h1 class="text-4xl font-semibold text-center text-gray-300 dark:text-gray-600 ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center flex-grow">
                ChatGPT 3.5
                <span class="bg-yellow-200 text-yellow-900 py-0.5 px-1.5 text-xs md:text-sm rounded-md uppercase">
                  Clone
                </span>
              </h1>
            )}

            <div className="h-15% absolute bottom-0 w-4/5  border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white fade">
              <form
                className="flex flex-col py-2 flex-grow mx-14 my-4 py-3 px-3 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
                onSubmit={handleSubmit}
              >
                <input
                  tabindex="0"
                  data-id="root"
                  rows="1"
                  class="outline-none chat-text m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 focus:border-0 dark:bg-transparent md:pl-0"
                  value={userText}
                  onChange={handleChange}
                  minLength="1"
                  maxLength="300"
                ></input>
                <button
                  type="submit"
                  className={`absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
                ${loading ? "loading-icon" : null}`}
                  disabled={loading}
                >
                  {!loading && (
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-4 w-4 mr-1"
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatGPTChatbox;
