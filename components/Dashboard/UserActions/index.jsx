import React from "react";
import ApiKeyInput from "./ApiKeyInput";
import LogoutButton from "./LogoutButton";
import DeleteAllChatsButton from "./DeleteAllChatsButton";
import DarkModeToggle from "./DarkModeToggle";

function UserActions({ chats, session, setError, handleDeleteChats }) {
  return (
    <>
      {session && (
        <>
          <ApiKeyInput session={session} setError={setError} />
          <DarkModeToggle/>
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
