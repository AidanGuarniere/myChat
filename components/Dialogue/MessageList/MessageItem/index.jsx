import React, { useState } from "react";
import ChatIcon from "./Icons/ChatIcon";
import UserIcon from "./Icons/UserIcon";
import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";

function MessageItem({ message, chats, selectedChat, session, setChats }) {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const handleMessageSelect = () => {
    if (message.role === "user" && selectedMessageId !== message["_id"]) {
      setSelectedMessageId(message["_id"]);
    }
  };

  const resetMessageSelect = () => {
    if (message.role === "user") {
      setSelectedMessageId(null);
    }
  };

  return (
    <div
      className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${
        message.role === "user"
          ? "bg-white dark:bg-gray-800"
          : "bg-gray-50 dark:bg-[#444654]"
      }`}
      onMouseEnter={handleMessageSelect}
      onClick={handleMessageSelect}
      onMouseLeave={resetMessageSelect}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-md lg:max-w-2xl xl:max-w-[53.275rem] p-4 md:py-8 flex lg:px-0 m-auto">
        <div className="w-8 h-8 flex flex-col justify-center items-center">
          {message.role === "assistant" ? <ChatIcon /> : <UserIcon />}
        </div>

        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          {message.role === "assistant" ? (
            <AssistantMessage message={message.content} />
          ) : (
            // {/* change to selectedChat, setSelectedChat*/}

            <UserMessage
              message={message}
              selectedMessageId={selectedMessageId}
              chats={chats}
              selectedChat={selectedChat}
              session={session}
              setChats={setChats}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
