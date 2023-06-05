import React, { useState, useEffect, useRef } from "react";
import ChatItemIcon from "./ChatItemIcon";
import TitleInput from "./TitleInput";
import EditDeleteButtons from "./EditDeleteButtons";

export default function ChatItem({
  session,
  chat,
  index,
  selectedChat,
  setSelectedChat,
  setChats,
  setError,
  handleDeleteChats,
}) {
  //change to .id
  const isSelectedChat = selectedChat === chat._id;
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [chatTitle, setChatTitle] = useState("");

  useEffect(() => {
    const chatTitleValue = chat.title.substring(0, 20);
    setChatTitle(chatTitleValue);
  }, [chat]);

  const inputRef = useRef(null);

  return (
    <a
      className={`text-left flex p-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 ${
        selectedChat === chat._id
          ? "bg-gray-800"
          : "bg-gray-900 hover:bg-[rgba(52,53,65,.5)]"
      } group animate-flash `}
      key={index}
      // fetch chat content on click
      onClick={() => {
        setSelectedChat(chat._id);
      }}
    >
      <ChatItemIcon />
      <span className="flex-1 text-ellipsis overflow-hidden break-all relative">
        {isSelectedChat ? (
          showTitleInput ? (
            <TitleInput
              inputRef={inputRef}
              titleInputValue={titleInputValue}
              setTitleInputValue={setTitleInputValue}
            />
          ) : (
            <>
              <p className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800" />
              {chatTitle}
            </>
          )
        ) : (
          <>
            <p className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]" />
            {chatTitle}
          </>
        )}
      </span>
      {isSelectedChat && (
        <EditDeleteButtons
          session={session}
          showTitleInput={showTitleInput}
          selectedChat={selectedChat}
          chat={chat}
          setChats={setChats}
          setError={setError}
          inputRef={inputRef}
          titleInputValue={titleInputValue}
          setTitleInputValue={setTitleInputValue}
          setShowTitleInput={setShowTitleInput}
          handleDeleteChats={handleDeleteChats}
        />
      )}
    </a>
  );
}
