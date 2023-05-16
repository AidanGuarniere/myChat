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
      <div className="w-full h-full overflow-y-scroll pl-2 md:pl-[.55rem]">
        <div className="w-full h-full flex flex-col gap-2 text-gray-100 font-normal">
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
