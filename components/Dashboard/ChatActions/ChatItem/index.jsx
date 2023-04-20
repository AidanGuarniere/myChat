import React, {useState, useRef} from 'react'
import ChatItemIcon from './ChatItemIcon';
import TitleInput from './TitleInput';
import EditDeleteButtons from './EditDeleteButtons';

export default function ChatItem({
  chat,
  index,
  selectedChat,
  setSelectedChat,
  setChats,
  setError,
  handleDeleteChats,
}) {
  const isSelectedChat = selectedChat === chat.id;
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState("");

  const inputRef = useRef(null);

  return (
    <a
      className={`text-left flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 ${
        selectedChat === chat.id
          ? "bg-gray-800"
          : "bg-gray-1000 hover:bg-[rgba(52,53,65,.5)]"
      } group animate-flash `}
      key={index}
      onClick={() => {
        setSelectedChat(chat.id);
      }}
    >
      <ChatItemIcon />
      <span className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
        {isSelectedChat ? (
          showTitleInput ? (
            <TitleInput
              inputRef={inputRef}
              titleInputValue={titleInputValue}
              setTitleInputValue={setTitleInputValue}
            />
          ) : (
            <>
              <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800" />
              {chat.title}
            </>
          )
        ) : (
          <>
            <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-1000 group-hover:from-[#2A2B32]" />
            {chat.title}
          </>
        )}
      </span>
      {isSelectedChat && (
        <EditDeleteButtons
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