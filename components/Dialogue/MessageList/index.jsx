import React from "react";
import MessageItem from "./MessageItem";

function MessageList({ chats, selectedChat, session, setChats }) {
  const selectedChatIndex = chats.findIndex((chat) => chat.id === selectedChat);
  const messages = chats[selectedChatIndex]?.messages || [];

  return (
    <>
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
    </>
  );
}

export default MessageList;

