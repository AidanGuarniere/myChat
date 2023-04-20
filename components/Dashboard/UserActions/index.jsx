import React from "react";
import { useSession } from "next-auth/react";
import ApiKeyInput from "./ApiKeyInput";
import LogoutButton from "./LogoutButton";
import DeleteAllChatsButton from "./DeleteAllChatsButton";

// import useDarkMode from "../hooks/useDarkMode";

function UserActions({ chats, setError, handleDeleteChats }) {
  const { data: session, status, update } = useSession();
  //   const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      {session && (
        <>
          <ApiKeyInput session={session} update={update} setError={setError} />
          {/* dark mode toggle *darkmode classes need to be integrated to UI*
          <button
            className="flex p-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
            onClick={toggleDarkMode}
          >
            <img
              src={
                isDarkMode
                  ? "/light-mode-icon.svg"
                  : "/dark-mode-icon.svg"
              }
              alt="Toggle Mode Icon"
              className="h-4 w-4"
            />
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button> */}
          <LogoutButton />
        </>
      )}
      {chats.length > 0 && (
        <DeleteAllChatsButton handleDeleteChats={handleDeleteChats} />
      )}
    </>
  );
}

export default UserActions;
