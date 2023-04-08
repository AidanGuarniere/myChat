import React, { useState, useEffect } from "react";
import { fetchChats, createChat, updateChat } from "../utils/chatUtils";
import { sendMessageHistoryToGPT } from "../utils/gptUtils";

function Chatbox({
  session,
  setError,
  userText,
  setUserText,
  chats,
  setChats,
  selectedChat,
  setSelectedChat,
}) {
  const [loading, setLoading] = useState(false);
  const [showRegen, setShowRegen] = useState(false);

  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  useEffect(() => {
    if (showRegen === true) {
      setShowRegen(false);
    }
  }, [selectedChat]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userText.length >= 1) {
      setLoading(true);
      setError(null);
      try {
        let messageHistoryForGPT;
  
        // If there's a selected chat, append the user's message to its message history
        if (selectedChat) {
          const selectedIndex = chats.findIndex(
            (chat) => chat.id === selectedChat
          );
          const updatedChat = { ...chats[selectedIndex] };
          updatedChat.messages.push({
            role: "user",
            content: userText,
          });
          messageHistoryForGPT = updatedChat.messages.map((message) => ({
            role: message.role,
            content: message.content,
          }));
        } else {
          // If there's no selected chat, create a new message history with the user's message
          messageHistoryForGPT = [
            {
              role: "system",
              content:
                "You are a helpful assistant and expert programmer. You excel at solving problems and turning natural language into functioning code. You speak efficiently and format your code properly.",
            },
            {
              role: "user",
              content: userText,
            },
          ];
        }
  
        // Send the message history to the API to get the assistant's response
        const gptResponse = await sendMessageHistoryToGPT(messageHistoryForGPT, session.user.apiKey);
  
        messageHistoryForGPT.push(gptResponse.choices[0].message);
        // If there's no selected chat, create a new chat with the given message history
        if (!selectedChat) {
          const newChat = {
            userId: session.user.id,
            id: gptResponse.id,
            title: userText,
            messages: messageHistoryForGPT,
          };
          await createChat(newChat);
          setSelectedChat(gptResponse.id);
        } else {
          // If there's a selected chat, update it with the new message history
          const updatedChat = {
            userId: session.user.id,
            id: selectedChat,
            messages: messageHistoryForGPT,
          };
          await updateChat(updatedChat, setChats);
        }
        setUserText("");
        const updatedChats = await fetchChats(session.user.id);
        setChats(updatedChats);
        setLoading(false);
        setShowRegen(true);
      } catch (error) {
        setShowRegen(true);
        setError(error);
        setLoading(false);
      }
    } else {
      console.error("Please enter a valid prompt");
    }
  };
  

  const handleRegen = async () => {
    if (selectedChat) {
      setLoading(true);
      setError(null);
      try {
        const selectedIndex = chats.findIndex(
          (chat) => chat.id === selectedChat
        );
        const updatedChat = { ...chats[selectedIndex] };

        const messageHistoryForGPT = updatedChat.messages
          .slice(0, -1)
          .map((message) => ({
            role: message.role,
            content: message.content,
          }));
          const gptResponse = await sendMessageHistoryToGPT(messageHistoryForGPT, session.user.apiKey);

        messageHistoryForGPT.push(gptResponse);

        updatedChat.messages = messageHistoryForGPT;

        // Update the chat in the database with the new message history
        await updateChat(updatedChat);

        // Update the local state with the new chat data
        const updatedChats = [...chats];
        updatedChats[selectedIndex] = updatedChat;
        setChats(updatedChats);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="pl-[260px] absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent 
      md:dark:border-transparent md:bg-vert-light-gradient dark:bg-gray-800  dark:md:bg-vert-dark-gradient pt-8"
    >
      <div
        className={`flex ml-1 md:w-full md:m-auto gap-0 md:gap-2 justify-center ${
          showRegen ? "block" : "hidden"
        }`}
      >
        <button
          onClick={handleRegen}
          className="btn relative btn-neutral border-0 md:border"
          fdprocessedid="qe1rko"
        >
          <div className="flex w-full items-center justify-center gap-2">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            Regenerate response
          </div>
        </button>
      </div>
      <form
        className="flex flex-col flex-grow mx-auto my-2 py-3 px-3 relative border border-black/10 bg-white 
        dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md md:max-w-2xl lg:max-w-3xl md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl"
        onSubmit={handleSubmit}
        style={{ boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.1)" }}
      >
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
              //shrink/grow on input logic
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={handleKeyDown}
          ></textarea>
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
    </div>
  );
}

export default Chatbox;
