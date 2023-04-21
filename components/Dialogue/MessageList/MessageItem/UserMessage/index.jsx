import React, { useState } from "react";
import { sendMessageHistoryToGPT } from "../../../../../utils/gptUtils";
import { updateChat, fetchChats } from "../../../../../utils/chatUtils";

function UserMessage({ message, hoveredMessageId, chats, selectedChat, session, setChats }) {
    const [editMessageId, setEditMessageId] = useState(null);
    const [editedMessage, setEditedMessage] = useState("");
  
    const handleEditToggle = (messageId) => {
      if (editMessageId === messageId) {
        setEditMessageId(null);
      } else {
        setEditMessageId(messageId);
      }
    };
  
    const handleMessageEdit = async () => {
      const chatIndex = chats.findIndex((chat) => chat.id === selectedChat);
      const messageIndex = chats[chatIndex].messages.findIndex(
        (msg) => msg._id === editMessageId
      );
  
      const updatedMessageHistory = chats[chatIndex].messages.slice(
        0,
        messageIndex
      );
  
      updatedMessageHistory.push({
        role: "user",
        content: editedMessage,
      });
  
      const messageHistoryForGPT = updatedMessageHistory.map(
        ({ role, content }) => ({
          role,
          content,
        })
      );
  
      const gptResponse = await sendMessageHistoryToGPT(
        messageHistoryForGPT,
        session.user.apiKey
      );
  
      const updatedChat = {
        ...chats[chatIndex],
        messages: updatedMessageHistory.concat(gptResponse.choices[0].message),
      };
      await updateChat(updatedChat);
  
      const updatedChats = await fetchChats();
      setChats(updatedChats);
  
      setEditMessageId(null);
      setEditedMessage("");
    };
  
    const handleCancel = () => {
      setEditMessageId(null);
      setEditedMessage("");
    };
  return (
    <div className="w-full min-h-[20px] flex flex-col items-start gap-4 text-gray-800">
      {editMessageId === message["_id"] ? (
        <div className="w-full">
          <textarea
            className="w-full m-0 resize-none border-0 bg-transparent p-0 focus:ring-0 focus-visible:ring-0 outline-none"
            defaultValue={message.content}
            onFocus={(e) => setEditedMessage(e.target.value)}
            onChange={(e) => setEditedMessage(e.target.value)}
          />
          <div className="text-center mt-2 flex justify-center">
            <button
              className="btn relative btn-primary mr-2"
              onClick={handleMessageEdit}
            >
              <div className="flex w-full items-center justify-center gap-2">
                Save &amp; Submit
              </div>
            </button>
            <button
              className="btn relative btn-neutral"
              onClick={handleCancel}
            >
              <div className="flex w-full items-center justify-center gap-2">
                Cancel
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>{message.content}</p>
          {hoveredMessageId === message["_id"] && (
            <div className="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
              <button
                className="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible"
                onClick={() => handleEditToggle(message["_id"])}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMessage;
