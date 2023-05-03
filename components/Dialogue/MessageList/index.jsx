import React, { useState, useEffect } from "react";
import MessageItem from "./MessageItem";

function MessageList({ chats, selectedChat, session, setChats }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const selectedChatIndex = chats.findIndex(
      (chat) => chat.id === selectedChat
    );
    console.log(selectedChatIndex)
    const currentMessages = chats[selectedChatIndex]?.messages;
    if (messages !== currentMessages) {
      setMessages(currentMessages);
    }
    // console.log(selectedChat)
    // console.log("m", messages);
    // console.log("cm", currentMessages);
  }, [selectedChat, chats]);

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
      <div className="bg-white h-[21.5%]" />
    </>
  );
}

export default MessageList;
