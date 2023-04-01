import React, { useState, useRef, useEffect } from "react";
import ErrorDisplay from "../components/ErrorDisplay";
import Chatbox from "./Chatbox";
import ChatIcon from "./ChatIcon";
import UserIcon from "./UserIcon";
import ChatScrollButton from "./ChatScrollButton";
import ChatMessage from "./ChatMessage";
import { sendMessageHistoryToGPT } from "../utils/gptUtils";
import { updateChat, fetchChats } from "../utils/chatUtils";

function Chats({
  userText,
  setUserText,
  error,
  setError,
  chats,
  setChats,
  selectedChat,
  setSelectedChat,
}) {
  const chatRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState();
  const [showQueryEdit, setShowQueryEdit] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");

  useEffect(() => {
    if (selectedChat) {
      if(editMessageId){setEditMessageId(null)}
      localStorage.setItem("selectedChat", selectedChat);
    }
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [chats, selectedChat]);

  const handleEditToggle = (messageId) => {
    if (editMessageId === messageId) {
      setEditMessageId(null);
    } else {
      setEditMessageId(messageId);
    }
  };

  const handleSaveAndSubmit = async () => {
    const chatIndex = chats.findIndex((chat) => chat.id === selectedChat);
    const messageIndex = chats[chatIndex].messages.findIndex(
      (msg) => msg.id === editMessageId
    );

    // Update message history with the edited message and remove all subsequent messages
    const updatedMessageHistory = chats[chatIndex].messages.slice(
      0,
      messageIndex - 1
    );
    updatedMessageHistory.push({
      role: "user",
      content: editedMessage,
    });

    // Filter out unnecessary properties before sending to GPT
    const messageHistoryForGPT = updatedMessageHistory.map(
      ({ role, content }) => ({
        role,
        content,
      })
    );

    // Send the updated message history to /api/gpt
    const gptResponse = await sendMessageHistoryToGPT(messageHistoryForGPT);
    // Update the message history with the response from sendMessageHistoryToGPT and update the chat
    const updatedChat = {
      ...chats[chatIndex],
      messages: updatedMessageHistory.concat(gptResponse),
    };
    console.log(updatedChat);
    await updateChat(updatedChat);

    // Call fetchChats and update the chats state
    const updatedChats = await fetchChats();
    console.log(updatedChats);
    setChats(updatedChats);

    // Hide the edit UI
    setEditMessageId(null);
    setEditedMessage("");
  };

  const handleCancel = () => {
    setEditMessageId(null);
    setEditedMessage("");
  };

  return (
    <div className="md:pl-[260px] h-screen p-0 m-0 overflow-x-hidden w-full">
      {}
      <div className="chat h-full w-full overflow-y-scroll m-0 p-0 flex">
        {error ? (
          <ErrorDisplay error={error} />
        ) : selectedChat !== null &&
          chats[chats.findIndex((chat) => chat.id === selectedChat)] ? (
          <div
            className="bg-white overflow-y-scroll p-0 w-full h-full "
            ref={chatRef}
            key={selectedChat}
            onScroll={() => {
              setScrollHeight(chatRef.current.scrollTop);
            }}
          >
            {chats[
              chats.findIndex((chat) => chat.id === selectedChat)
            ].messages.map((message, index) =>
              message.role === "system" ? null : (
                <div
                  className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50  ${
                    message.role === "user" ? "bg-white" : "bg-gray-50"
                  } dark:bg-[#444654]`}
                  key={`${message["_id"]}${index}`}
                  onMouseEnter={() =>
                    message.role === "user" &&
                    setHoveredMessageId(message["_id"])
                  }
                  onMouseLeave={() =>
                    message.role === "user" && setHoveredMessageId(null)
                  }
                >
                  <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                    <div className="w-[30px] flex flex-col relative items-end">
                      {message.role === "assistant" ? (
                        <ChatIcon />
                      ) : (
                        <UserIcon />
                      )}
                    </div>

                    <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      <div className="w-full min-h-[20px] flex flex-col items-start gap-4 text-gray-800">
                        {message.role === "assistant" ? (
                          <ChatMessage markdownContent={message.content} />
                        ) : editMessageId === message["_id"] ? (
                          <div className="w-full">
                            <textarea
                              className="w-full m-0 resize-none border-0 bg-transparent p-0 focus:ring-0 focus-visible:ring-0 outline-none"
                              // style={{ height: "4080px", overflowY: "hidden" }}
                              defaultValue={message.content}
                              onFocus={(e) => setEditedMessage(e.target.value)}
                              onChange={(e) => setEditedMessage(e.target.value)}
                            />
                            <div className="text-center mt-2 flex justify-center">
                              <button
                                className="btn relative btn-primary mr-2"
                                onClick={handleSaveAndSubmit}
                              >
                                <div className="flex w-full items-center justify-center gap-2">
                                  Save &amp; Submit
                                </div>
                              </button>
                              <button
                                className="btn relative btn-neutral"
                                onClick={handleCancel}
                              >
                                <div className="flex w-full items-center justify-center gap-2">
                                  Cancel
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p>{message.content}</p>
                            {hoveredMessageId === message["_id"] && (
                              <div className="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
                                <button
                                  className="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible"
                                  onClick={() =>
                                    handleEditToggle(message["_id"])
                                  }
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
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
            <div className="bg-white  h-1/3" />
            <ChatScrollButton chatRef={chatRef} scrollHeight={scrollHeight} />
          </div>
        ) : (
          <h1 className="text-4xl font-semibold text-center text-gray-300 dark:text-gray-600 ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center flex-grow">
            ChatGPT
            <span className="bg-yellow-200 text-yellow-900 py-0.5 px-1.5 text-xs md:text-sm rounded-md uppercase">
              Clone
            </span>
          </h1>
        )}
        <Chatbox
          setError={setError}
          userText={userText}
          setUserText={setUserText}
          chats={chats}
          setChats={setChats}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          chatRef={chatRef}
        />
      </div>
    </div>
  );
}

export default Chats;
