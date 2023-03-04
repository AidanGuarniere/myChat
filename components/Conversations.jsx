import React from "react";


function Conversations({ conversations, loading }) {
  return (
    <div className="conversation-container">
          {conversations.length > 0 ? (
            <div className="conversation-history">
              <h2 className="text-xl font-medium mb-2">
                Conversation History:
              </h2>
              {selectedConversation !== null &&
              conversations[selectedConversation] ? (
                <div className="bg-white rounded p-4 mt-4 h-auto">
                  <div className="conversation-item" key={selectedConversation}>
                    <div className="bg-white rounded p-4 mt-4 h-auto">
                      {selectedConversation === 0 ? (
                        <div>
                          {" "}
                          <p className="text-black-700 font-bold break-words px-2 max-h-100%">
                            {conversations[0].prompt}
                          </p>
                          <p className="text-gray-700 break-words px-2 max-h-100%">
                            {conversations[selectedConversation]
                              ? conversations[0].response
                              : "Loading..."}
                          </p>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          {selectedConversation && (
                            <p className="text-black-700 font-bold break-words px-2 max-h-100%">
                              {conversations[selectedConversation].prompt}
                            </p>
                          )}
                          {selectedConversation && (
                            <p className="text-gray-700 break-words px-2 max-h-100%">
                              {conversations[selectedConversation]
                                ? conversations[selectedConversation].response
                                : "Loading..."}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded p-4 mt-4 h-auto">
                  <div
                    className="conversation-item"
                    key={conversations.length - 1}
                  >
                    <div className="bg-white rounded p-4 mt-4 h-auto">
                      {conversations.length && (
                        <p className="text-black-700 font-bold break-words px-2 max-h-100%">
                          {conversations[conversations.length - 1].prompt}
                        </p>
                      )}
                      {conversations.length && (
                        <p className="text-gray-700 break-words px-2 max-h-100%">
                          {conversations[conversations.length - 1]
                            ? conversations[conversations.length - 1].response
                            : "Loading..."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="conversation-history">
              <h2 className="text-xl font-medium mb-2">
                Start a Conversation:
              </h2>
              <div className="bg-white rounded p-4 mt-4 h-auto">
                <div className="conversation-item" key={selectedConversation}>
                  <div className="bg-white rounded p-4 mt-4 h-auto">
                    <p className="text-gray-700 break-words px-2 max-h-100%"></p>
                  </div>
                </div>
              </div>
            </div>
          )}
  </div>

  );
}

export default Conversations;
