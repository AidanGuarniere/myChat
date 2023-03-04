import React from "react";

function ConversationHistory({
  conversations,
  userText,
  setUserText,
  setSelectedConversation,
}) {
  return (
    <div className="w-1/5 h-screen bg-gray-900 p-2 overflow-y-auto">
      <div className="conversation-history-sidebar">
        <button
          onClick={() => {
            if (userText.length) {
              setUserText("");
            }
            setSelectedConversation(null);
          }}
          className="w-full border border-gray-200 text-left text-gray-200 bg-gray-900 py-2 px-4 rounded-lg hover:bg-gray-800"
        >
          <span className="text-xl">+</span> New Chat
        </button>

        <h2 className="text-xl font-medium mb-2 text-gray-200">
          Conversation History:
        </h2>
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
