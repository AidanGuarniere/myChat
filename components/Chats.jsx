import React, { useState, useRef, useEffect } from "react";
import ErrorDisplay from "../components/ErrorDisplay";
import Chatbox from "./Chatbox";
import ChatIcon from "./ChatIcon";
import UserIcon from "./UserIcon";
import ChatScrollButton from "./ChatScrollButton";
import ChatMessage from "./ChatMessage";

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

  useEffect(() => {
    if (selectedChat) {
      localStorage.setItem("selectedChat", selectedChat);
    }
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [chats, selectedChat]);

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
                  key={`${message.id}${index}`}
                >
                  <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                    <div className="w-[30px] flex flex-col relative items-end">
                      {message.role === "assistant" ? (
                        <ChatIcon />
                      ) : (
                        <UserIcon />
                      )}{" "}
                    </div>

                    <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      <div className="min-h-[20px] flex flex-col items-start gap-4 text-gray-800">
                        {
                          message.role === "assistant" ? (
                            <ChatMessage markdownContent={message.content} />
                          ) : (
                            // add conditional to show edit ui or message content
                            <p>{message.content}</p>
                          )
                        }
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
            ChatGPT 3.5
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
