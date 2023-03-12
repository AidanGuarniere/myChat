import React, { useState, useEffect } from "react";
import axios from "axios";

function Chatbox({
  setError,
  userText,
  setUserText,
  conversations,
  setConversations,
  selectedConversation,
  setSelectedConversation,
}) {
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setUserText(event.target.value);
  };

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

          // add new user message to conversation messages
          updatedConversation.messages.push({
            role: "user",
            content: userText,
          });

          // update messageHistory
          messageHistory = updatedConversation.messages;
        } else {
          // if no conversation is selected, start message history with first user prompt
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

        // update messageHistory with completion reponse's message
        messageHistory.push(completion.choices[0].message);

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
        setUserText("");
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    } else {
      setError("Please enter a valid prompt");
    }
  };
  return (
    <div className="h-15% absolute bottom-0 w-4/5  border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white fade">
      <form
        className="flex flex-col py-2 mx-auto w-4/5 flex-grow mx-14 my-4 py-3 px-3 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.03)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
        onSubmit={handleSubmit}
      >
        <input
          tabindex="0"
          data-id="root"
          rows="1"
          className="outline-none chat-text m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 focus:border-0 dark:bg-transparent md:pl-0"
          value={userText}
          onChange={handleChange}
          minLength="1"
          maxLength="300"
        ></input>
        <button
          type="submit"
          className={`absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100
            dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent
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
    </div>
  );
}

export default Chatbox;
