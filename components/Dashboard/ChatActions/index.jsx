import React, { useEffect, useState } from "react";
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
  const [isIOSSafari, setIsIOSSafari] = useState(false);

  useEffect(() => {
    // Check if the user is using iOS Safari to maintain UI consistency across browsers
    if (/iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent)) {
      setIsIOSSafari(true);
    }
  }, []);

  // if true add padding to the right side of the div to account for iOS Safari's scrollbar behavior
  const dashboardClasses = `dashboard w-full h-full overflow-y-scroll pl-2 md:pl-[.55rem] ${
    isIOSSafari && "pr-2 md:mr-[.55rem]"
  }`;

  return (
    <>
      <NewChatButton setSelectedChat={setSelectedChat} />
      <div className={dashboardClasses}>
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
