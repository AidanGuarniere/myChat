import React, { useState, useEffect } from "react";
import MessageItem from "./MessageItem";

function MessageList({ chats, selectedChat, session, setChats }) {
  //replace with selectedChat state
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const selectedChatIndex = chats.findIndex(
      (chat) => chat._id === selectedChat
    );
    const currentMessages = chats[selectedChatIndex]?.messages;
    if (messages !== currentMessages) {
      setMessages(currentMessages);
    }
  }, [selectedChat, chats, messages]);

  return (
    <>
      {/* change to setSelectedChat*/}

      {messages.map((message, index) =>
        message.role === "system" ? null : (
          <MessageItem
            key={`${message["_id"]}${index}`}
            message={message}
            chats={chats}
            selectedChat={selectedChat}
            session={session}
            setChats={setChats}
          />
        )
      )}
      <div className="bg-white h-[33.75%] dark:bg-gray-800" />
    </>
  );
}

export default MessageList;
