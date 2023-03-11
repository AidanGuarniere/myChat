import React from "react";

function ConversationHistory({
  conversations,
  userText,
  setUserText,
  setSelectedConversation,
}) {
  return (
    <div className="w-1/5 h-screen bg-gray-1000 p-2 overflow-y-auto">
      <div className="conversation-history-sidebar">
        <button
          class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 w-full"
          onClick={() => {
            if (userText.length) {
              setUserText("");
            }
            setSelectedConversation(null);
          }}
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New chat
        </button>
        {conversations.map((conversation, index) => (
          <div
            className="conversation-item"
            key={index}
            onClick={() => {
              if (userText.length) {
                setUserText("");
              }
              setSelectedConversation(conversation.id);
            }}
          >
            <h3 className="text-lg font-medium mb-2 text-gray-200">
              {conversation.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversationHistory;
