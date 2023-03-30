import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatHistory({
  chats,
  userText,
  setUserText,
  setChats,
  setError,
  selectedChat,
  setSelectedChat,
}) {
  const [titleInputValue, setTitleInputValue] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const inputRef = useRef(null);

  const fetchChats = async () => {
    try {
      const response = await axios.get("/api/chats");
      if (response.data) {
        setChats(response.data);
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching chats:", error);
    }
  };

  const deleteChats = async (id) => {
    if (id) {
      await axios.delete("/api/chats", { data: { id } });
      setSelectedChat(null);
      fetchChats();
    } else {
      await axios.delete("/api/chats");
      setChats([]);
    }
    setSelectedChat(null);
  };

  const editChatTitle = async (id, title, currentTitle) => {
    if (title !== currentTitle) {
      if (id && title) {
        await axios.put("/api/chats", { id, title });
        fetchChats();
      } else {
        setError("Please enter a valid title");
      }
    }
    hideTitleInput();
  };

  const hideTitleInput = () => {
    setTitleInputValue("");
    setShowTitleInput(false);
  };

  const handleDocumentClick = (e) => {
    const isEditButton = e.target.id === "show-title-input";
    const isSubmitButton = e.target.id === "submit-title-edit";

    if (!isEditButton && !isSubmitButton) {
      hideTitleInput();
    }
  };

  useEffect(() => {
    if (showTitleInput && inputRef.current) {
      inputRef.current.focus();
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showTitleInput]);

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col bg-gray-1000 dark z-50">
      <div className="flex h-full min-h-0 flex-col">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <button
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20"
              onClick={() => {
                if (userText.length) {
                  setUserText("");
                }
                setSelectedChat(null);
              }}
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New chat
            </button>
            <div className="w-full flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2 h-1/2">
              <div className="flex flex-col gap-2 text-gray-100 text-sm">
                {chats.map((chat, index) => (
                  <a
                    className={`text-left flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 ${
                      selectedChat === chat.id
                        ? "bg-gray-800"
                        : "bg-gray-1000 hover:bg-[rgba(52,53,65,.5)]"
                    } group animate-flash `}
                    key={index}
                    onClick={() => {
                      if (userText.length) {
                        setUserText("");
                      }
                      setSelectedChat(chat.id);
                    }}
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
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                      {selectedChat === chat.id ? (
                        showTitleInput ? (
                          <input
                            ref={inputRef}
                            type="text"
                            className="content h-5 w-full bg-transparent text-white border border-blue-600 outline-none focus:outline-blue-600 border-[1.5px] mb-1 align-middle pb-1"
                            value={titleInputValue}
                            onChange={(e) => setTitleInputValue(e.target.value)}
                          ></input>
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
                    {selectedChat === chat.id && (
                      <div
                        className="absolute flex right-1 z-10 text-gray-300 visible"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {showTitleInput ? (
                          <>
                            <button
                              id="submit-title-edit"
                              className="p-1 hover:text-white"
                              onClick={() =>
                                editChatTitle(
                                  chat.id,
                                  titleInputValue,
                                  chat.title
                                )
                              }
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                            <button
                              className="p-1 hover:text-white"
                              onClick={hideTitleInput}
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
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              id="show-title-input"
                              className="p-1 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTitleInputValue(chat.title);
                                setShowTitleInput(true);
                              }}
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
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                              </svg>
                            </button>
                            <button
                              className="p-1 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChats(selectedChat);
                              }}
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
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
            {chats.length > 0 && (
              <button
                className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
                onClick={() => {
                  deleteChats();
                }}
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
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Clear conversations
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
