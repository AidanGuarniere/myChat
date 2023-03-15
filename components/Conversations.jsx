import React, { useState, useRef, useEffect } from "react";
import Chatbox from "./Chatbox";

function Conversations({
  userText,
  setUserText,
  setError,
  conversations,
  setConversations,
  selectedConversation,
  setSelectedConversation,
}) {
  const conversationRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: "auto", // use "auto" for instant scrolling
      });
    }
  }, [selectedConversation]);

  return (
    <div className="w-79.71% h-screen p-0 m-0 overflow-x-hidden ">
      <div className="conversation h-full overflow-y-scroll m-0 p-0 flex">
        {selectedConversation !== null &&
        conversations[
          conversations.findIndex(
            (conversation) => conversation.id === selectedConversation
          )
        ] ? (
          <div
            className="bg-white overflow-y-scroll p-0 w-full h-full "
            ref={conversationRef}
            key={selectedConversation}
            onScroll={() => {
              setScrollHeight(conversationRef.current.scrollTop);
            }}
          >
            {conversations[
              conversations.findIndex(
                (conversation) => conversation.id === selectedConversation
              )
            ].messages.map((message, index) =>
              message.role === "system" ? null : (
                <p
                  key={index}
                  className={`py-6 px-24 text-xxl${
                    message.role === "user" ? "bg-gray-200" : "bg-white"
                  } break-words`}
                >
                  {message.role === "assistant" ? (
                    <span className="font-semibold">ChatGPT: </span>
                  ) : null}
                  {message.content}
                </p>
              )
            )}
            <div className="bg-white  h-1/5" />
            {/* scroll-to-bottom button */}
            {conversationRef.current
              ? scrollHeight + conversationRef.current.clientHeight * 1.1 <
                  conversationRef.current.scrollHeight && (
                  <button
                    className="cursor-pointer absolute right-6 bottom-[124px] md:bottom-[120px] z-10 rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
                    onClick={() => {
                      if (conversationRef.current) {
                        conversationRef.current.scrollTo({
                          top: conversationRef.current.scrollHeight,
                          behavior: "smooth", // use "auto" for instant scrolling
                        });
                      }
                    }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 m-1"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </button>
                )
              : null}
          </div>
        ) : (
          <h1 className="text-4xl font-semibold text-center text-gray-300 dark:text-gray-600 ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center flex-grow">
            ChatGPT 3.5
            <span className="bg-yellow-200 text-yellow-900 py-0.5 px-1.5 text-xs md:text-sm rounded-md uppercase">
              Clone
            </span>
          </h1>
        )}

        <Chatbox
          setError={setError}
          userText={userText}
          setUserText={setUserText}
          conversations={conversations}
          setConversations={setConversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          conversationRef={conversationRef}
        />
      </div>
    </div>
  );
}

export default Conversations;
