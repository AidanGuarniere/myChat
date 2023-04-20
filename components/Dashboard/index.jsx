import React from "react";
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
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col bg-gray-1000 dark z-50">
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
  );
}

export default Dashboard;
