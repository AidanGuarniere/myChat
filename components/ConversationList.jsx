import React from "react";


function ConversationList({ conversations, loading }) {
  return (
    <div className="conversation-container">
    {conversations.map((conversation, index) => (
      <div className="conversation-sidebar" key={index}>
        <h2 className="text-xl font-medium mb-2">
          Conversation {index + 1}:
        </h2>
        <div className="bg-white rounded p-4 mt-4 h-auto">
          <p className="text-gray-700 break-words px-2 max-h-100%">
            {conversation.prompt}
          </p>
          <p className="text-gray-700 break-words px-2 max-h-100%">
            {loading ? "Loading..." : conversation.response}
          </p>
        </div>
      </div>
    ))}
  </div>

  );
}

export default ConversationList;
