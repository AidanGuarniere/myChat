import React, { useState, useEffect } from "react";
import { updateChat } from "../../../../../utils/chatUtils";
import ConfirmAction from "../../../ConfirmAction";
import TitleInput from "../TitleInput";

export default function EditDeleteButtons({
  session,
  showTitleInput,
  selectedChat,
  chat,
  setChats,
  setError,
  inputRef,
  titleInputValue,
  setTitleInputValue,
  setShowTitleInput,
  handleDeleteChats,
}) {
  const [showDelete, setShowDelete] = useState(false);

  const hideTitleInput = () => {
    setTitleInputValue("");
    setShowTitleInput(false);
  };

  const handleEditChatTitle = async (id, title) => {
    if (id && title) {
      try {
        await updateChat(id, { title });
        const updatedChat = {
          userId: session.user.id,
          title: title,
          messages: chat.messages,
        };
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === selectedChat ? updatedChat : chat
          )
        );
      } catch (error) {
        setError(`Error updating chat title:${error}`);
      }
    } else {
      setError("Please enter a valid title");
    }
    hideTitleInput();
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      e.stopPropagation();
      const isEditButton = e.target.id === "show-title-input";
      const isSubmitButton = e.target.id === "submit-title-edit";
  
      if (!isEditButton && !isSubmitButton) {
        setTitleInputValue("");
        setShowTitleInput(false);      }
    };
  
    if (showTitleInput && inputRef.current) {
      inputRef.current.focus();
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [inputRef, showTitleInput, setTitleInputValue, setShowTitleInput]);

  return (
    <>
      {showTitleInput ? (
        <ConfirmAction
          confirmAction={(e) => {
            e.stopPropagation();

            if (chat.title !== titleInputValue) {
              handleEditChatTitle(selectedChat, titleInputValue);
            } else {
              setShowTitleInput(false);
            }
          }}
          denyAction={(e) => {
            e.stopPropagation();
            hideTitleInput();
          }}
        />
      ) : showDelete ? (
        <ConfirmAction
          confirmAction={(e) => {
            e.stopPropagation();
            handleDeleteChats(selectedChat);
          }}
          denyAction={(e) => {
            e.stopPropagation();
            setShowDelete(false);
          }}
        />
      ) : (
        <div
          className="absolute flex right-1 z-10 text-gray-300 visible"
          onClick={(e) => e.stopPropagation()}
        >
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
              className="h-[1.125rem] w-[1.125rem]"
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
              setShowDelete(true);
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.125rem] w-[1.125rem]"
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
        </div>
      )}
    </>
  );
}
