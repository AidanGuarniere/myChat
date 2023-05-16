import React from "react";
import ApiKeyInput from "./ApiKeyInput";
import LogoutButton from "./LogoutButton";
import DeleteAllChatsButton from "./DeleteAllChatsButton";
import DarkModeToggle from "./DarkModeToggle";

function UserActions({ chats, session, setError, handleDeleteChats }) {
  return (
    <div className="w-full z-10 p-[.55rem] bg-gray-900">
      <div className="border-t border-white/20 w-full pt-3 ">
        {session && (
          <>
            <ApiKeyInput session={session} setError={setError} />
            <DarkModeToggle />
            <LogoutButton />
          </>
        )}
        {chats.length > 0 && (
          <DeleteAllChatsButton handleDeleteChats={handleDeleteChats} />
        )}
      </div>
    </div>
  );
}

export default UserActions;
