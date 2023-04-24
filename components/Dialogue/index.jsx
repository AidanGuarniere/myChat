import React, { useState, useRef, useEffect } from "react";
import ErrorDisplay from "../ErrorDisplay";
import PromptActions from "./PromptActions";
import ChatScrollButton from "./ChatScrollButton";
import MessageList from "./MessageList";

function Dialogue({
  session,
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
  useEffect(() => {
    if (selectedChat) {
      if (chatRef.current) {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "auto",
        });
      }
    }
  }, [chats, selectedChat]);

  return (
    <div className="md:pl-[260px] h-screen p-0 m-0 overflow-x-hidden w-full">
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
            <MessageList
              chats={chats}
              selectedChat={selectedChat}
              session={session}
              setChats={setChats}
            />
            <ChatScrollButton chatRef={chatRef} scrollHeight={scrollHeight} />
          </div>
        ) : (
          <h1 className="text-4xl font-semibold text-center text-gray-300 dark:text-gray-600 ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center flex-grow">
            MyGPT
          </h1>
        )}
        <PromptActions
          session={session}
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
export default Dialogue;
