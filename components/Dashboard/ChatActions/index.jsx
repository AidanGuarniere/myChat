import React from "react";
import NewChatButton from "./NewChatButton";
import ChatItem from "./ChatItem";

function ChatActions({
  session,
  chats,
  setChats,
  setError,
  selectedChat,
  setSelectedChat,
  handleDeleteChats,
}) {
  return (
    <>
      <NewChatButton setSelectedChat={setSelectedChat} />
      <div className="w-full flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2 h-1/2">
        <div className="flex flex-col gap-2 text-gray-100 text-sm my-2">
        {[...chats].reverse().map((chat, index) => (
            <ChatItem
              key={`${chat._id}${index}`}
              session={session}
              chat={chat}
              index={index}
              setChats={setChats}
              setError={setError}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              handleDeleteChats={handleDeleteChats}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ChatActions;
