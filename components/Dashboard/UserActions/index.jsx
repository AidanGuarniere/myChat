import React from "react";
import { useSession } from "next-auth/react";
import ApiKeyInput from "./ApiKeyInput";
import LogoutButton from "./LogoutButton";
import DeleteAllChatsButton from "./DeleteAllChatsButton";

function UserActions({ chats, setError, handleDeleteChats }) {
  const { data: session, status, update } = useSession();
  return (
    <>
      {session && (
        <>
          <ApiKeyInput session={session} update={update} setError={setError} />
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
