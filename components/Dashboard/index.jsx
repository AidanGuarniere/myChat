import React, { useState, useEffect } from "react";
import { deleteChats } from "../../utils/chatUtils";
import ChatActions from "./ChatActions";
import UserActions from "./UserActions";

function Dashboard({
  session,
  chats,
  setChats,
  error,
  setError,
  selectedChat,
  setSelectedChat,
}) {
  const [closeSidebar, setCloseSidebar] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [chatTitle, setChatTitle] = useState(null);

  const handleDeleteChats = async (id) => {
    await deleteChats(id);
    if (id && chats.length > 1) {
      const updatedChats = chats.filter((chat) => chat._id !== id);
      setChats(updatedChats);
    } else {
      setChats([]);
    }
    setSelectedChat(null);
  };

  const toggleSidebar = () => {
    setCloseSidebar(!closeSidebar);
  };

  useEffect(() => {
    if (closeSidebar === false) {
      setTimeout(() => {
        setShowActions(false);
      }, 200);
    } else {
      setShowActions(true);
    }
  }, [closeSidebar]);

  useEffect(() => {
    if (selectedChat) {
      //change to .id
      const chatIndex = chats.findIndex((chat) => chat._id === selectedChat);
      const selectedChatTitle = { ...chats[chatIndex] };
      if (selectedChatTitle !== chatTitle) {
        setChatTitle(selectedChatTitle.title);
      }
    } else {
      setChatTitle("New chat");
    }
  }, [chats, chatTitle, selectedChat]);

  return (
    <>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-[260px] max-w-xs md:flex-col bg-gray-900 dark z-50">
        <div className="flex w-full h-full min-h-0 flex-col">
          <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
            <nav className="flex w-full h-full flex-1 flex-col space-y-1 text-sm font-normal ">
              <ChatActions
                session={session}
                chats={chats}
                setChats={setChats}
                setError={setError}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                handleDeleteChats={handleDeleteChats}
              />
              <UserActions
                session={session}
                chats={chats}
                setError={setError}
                handleDeleteChats={handleDeleteChats}
              />
            </nav>
          </div>
        </div>
      </div>
      <div className="md:hidden w-full flex items-center bg-gray-800 text-gray-200 p-[.625rem] border-b border-white/20 ">
        <button
          onClick={toggleSidebar}
          className=" inline-flex items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 className="text-base whitespace-nowrap overflow-hidden relative text-center px-4 w-[calc(100%-3rem)]">
          {chatTitle ? chatTitle : "New chat"}
          <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800"></div>
        </h1>
      </div>

      <div
        className={`${showActions ? "fixed" : "hidden"} inset-0 z-40 md:hidden`}
      >
        <div
          onClick={toggleSidebar}
          className={`fixed inset-0 bg-gray-600 ${
            closeSidebar ? "fadeIn" : "fadeOut"
          } bg-opacity-75 bg-div`}
        ></div>

        <aside
          className={`fixed top-0 left-0 bottom-0 w-[82%] max-w-xs bg-gray-900 dark z-50 ${
            closeSidebar ? "openSidebar" : "closeSidebar"
          }`}
        >
          <div className="flex w-full h-full min-h-0 flex-col">
            <ChatActions
              chats={chats}
              setChats={setChats}
              setError={setError}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              handleDeleteChats={handleDeleteChats}
            />
            <UserActions
              session={session}
              chats={chats}
              setError={setError}
              handleDeleteChats={handleDeleteChats}
            />
          </div>
        </aside>
        <div
          className={`${
            closeSidebar ? "absolute" : "hidden"
          } top-0 left-80 pt-2 opacity-100`}
        >
          <button
            type="button"
            className="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="1.25"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white"
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
