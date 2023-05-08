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
  selectedChatLoading,
  setSelectedChatLoading,
}) {
  const chatRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState();
  const [prevSelectedChat, setPrevSelectedChat] = useState(null);
  const [prevMessageCount, setPrevMessageCount] = useState(0);
  const selectedChatIndex = chats.findIndex((chat) => chat._id === selectedChat);

  useEffect(() => {
    if (selectedChatLoading === false && selectedChat !== null) {
      const currentChat =
        chats[chats.findIndex((chat) => chat._id === selectedChat)];
      if (
        chatRef.current &&
        (prevSelectedChat !== selectedChat ||
          currentChat.messages.length !== prevMessageCount)
      ) {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "auto",
        });
        if (currentChat.messages) {
          setPrevMessageCount(currentChat.messages.length);
        }
      }
    }
    setPrevSelectedChat(selectedChat);
  }, [chats, selectedChat, selectedChatLoading]);

  return (
    <div className="md:pl-[289px] w-full h-screen p-0 m-0 overflow-x-hidden">
      <div className="chat h-full w-full overflow-y-scroll m-0 p-0 flex">
        {error ? (
          <ErrorDisplay error={error} />
        ) : selectedChat !== null && chats[selectedChatIndex]?.messages ? (
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
