import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  const selectedChatIndex = chats.findIndex(
    (chat) => chat._id === selectedChat
  );

  useLayoutEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    if (selectedChatLoading === false && selectedChat !== null) {
      const currentChat =
        chats[chats.findIndex((chat) => chat._id === selectedChat)];
      if (
        chatRef.current &&
        (prevSelectedChat !== selectedChat ||
          currentChat.messages.length !== prevMessageCount)
      ) {
        // mid solution for attempted scroll before message render
        setTimeout(() => {
          chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "auto",
          });
        }, 100);
        if (currentChat.messages) {
          setPrevMessageCount(currentChat.messages.length);
        }
      }
    }
    setPrevSelectedChat(selectedChat);
  }, [
    chats,
    selectedChat,
    selectedChatLoading,
    prevMessageCount,
    prevSelectedChat,
  ]);

  return (
    <div className="md:pl-[260px] w-full h-full p-0 m-0 overflow-hidden bg-white dark:bg-gray-800">
      <div className="flex chat w-full h-full">
        {error ? (
          <ErrorDisplay error={error} />
        ) : selectedChat !== null && chats[selectedChatIndex]?.messages ? (
          <div
            className=" overflow-y-scroll p-0 w-full h-full"
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
          <h1 className="text-4xl font-bold text-center dark:bg-gray-800 text-gray-300 dark:text-gray-600 ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center flex-grow ">
            myChat
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
