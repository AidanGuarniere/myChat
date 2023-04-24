import React, { useState, useEffect } from "react";
import { fetchChats, deleteChats } from "../../utils/chatUtils";
import ChatActions from "./ChatActions";
import UserActions from "./UserActions";

function Dashboard({
  chats,
  setChats,
  setError,
  selectedChat,
  setSelectedChat,
}) {
  const [showChatActions, setShowChatActions] = useState(false);
  const [showUserActions, setShowUserActions] = useState(false);
  const [chatTitle, setChatTitle] = useState(null);

  const handleDeleteChats = async (id) => {
    await deleteChats(id);
    if (id && chats.length > 1) {
      const updatedChats = await fetchChats();
      setChats(updatedChats);
    } else {
      setChats([]);
    }
    setSelectedChat(null);
  };

  const toggleActions = () => {
    setShowChatActions(!showChatActions);
    setShowUserActions(false);
  };

  useEffect(() => {
    if (selectedChat) {
      const chatIndex = chats.findIndex((chat) => chat.id === selectedChat);
      const selectedChatTitle = { ...chats[chatIndex] };
      setChatTitle(selectedChatTitle.title);
    }
  }, [selectedChat]);

  return (
    <>
      <div className="hidden w-full md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col bg-gray-1000 dark z-50">
        <div className="flex md:w-full h-full min-h-0 flex-col">
          <div className="scrollbar-trigger flex md:w-full h-full w-full flex-1 items-start border-white/20">
            <nav className="flex md:w-full h-full flex-1 flex-col space-y-1 p-2">
              <ChatActions
                chats={chats}
                setChats={setChats}
                setError={setError}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                handleDeleteChats={handleDeleteChats}
              />
              <UserActions
                chats={chats}
                setError={setError}
                handleDeleteChats={handleDeleteChats}
              />
            </nav>
          </div>
        </div>
      </div>
      <div className="md:hidden w-full flex justify-between items-center bg-gray-800 text-gray-200 p-2">
        <button
          onClick={toggleActions}
          className="inline-flex items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 className="text-base font-normal whitespace-nowrap overflow-hidden relative mx-8">
          {chatTitle && chatTitle}
          <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800"></div>
        </h1>
      </div>

      <div
        className={`${
          showChatActions ? "fixed" : "hidden"
        } inset-0 z-40 md:hidden`}
      >
        <div
          onClick={toggleActions}
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
        ></div>
        <aside className="fixed top-0 left-0 bottom-0 w-[82%] bg-gray-1000 dark z-50 p-2 overflow-y-auto">
          <ChatActions
            chats={chats}
            setChats={setChats}
            setError={setError}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            handleDeleteChats={handleDeleteChats}
          />{" "}
          <UserActions
            chats={chats}
            setError={setError}
            handleDeleteChats={handleDeleteChats}
          />
        </aside>
        <div className="absolute top-0 right-4 pt-2 opacity-100">
          <button
            type="button"
            className="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleActions}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
