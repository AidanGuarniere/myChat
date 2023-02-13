import React from 'react'

function ConversationHistory({conversations, setUserText, setSelectedConversation}) {
  return (
    <div className="w-1/4 h-auto max-h-100% bg-gray-200 rounded-lg shadow-lg p-10 mr-2 overflow-hidden">
    <div className="conversation-history-sidebar">
      <h2 className="text-xl font-medium mb-2">Conversation History:</h2>
      {conversations.map((conversation, index) => (
        <div
          className="conversation-item"
          key={index}
          onClick={() => {
            setUserText("");
            setSelectedConversation(index);
          }}
        >
          <h3 className="text-lg font-medium mb-2">
            {conversation.prompt}
          </h3>
        </div>
      ))}
    </div>
  </div>  )
}

export default ConversationHistory