import React, { useState, useEffect } from "react";
import PromptForm from "./PromptForm";
import RegenResponseButton from "./RegenResponseButton";
import { fetchChats, createChat, updateChat } from "../../../utils/chatUtils";
import { sendMessageHistoryToGPT } from "../../../utils/gptUtils";

function PromptActions({
  session,
  setError,
  userText,
  setUserText,
  chats,
  setChats,
  selectedChat,
  setSelectedChat,
}) {
  const [loading, setLoading] = useState(false);
  const [showRegen, setShowRegen] = useState(false);

  useEffect(() => {
    if (showRegen === true) {
      setShowRegen(false);
    }
  }, [selectedChat]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userText.length >= 1) {
      setLoading(true);
      setUserText("");
      setError(null);
      try {
        let messageHistoryForGPT;

        // If there's a selected chat, append the user's message to its message history
        if (selectedChat) {
          const selectedIndex = chats.findIndex(
            (chat) => chat.id === selectedChat
          );
          const updatedChat = { ...chats[selectedIndex] };
          updatedChat.messages.push({
            role: "user",
            content: userText,
          });
          messageHistoryForGPT = updatedChat.messages.map((message) => ({
            role: message.role,
            content: message.content,
          }));
        } else {
          // If there's no selected chat, create a new message history with the user's message
          messageHistoryForGPT = [
            {
              role: "system",
              content:
                "You are a helpful assistant and expert programmer. You excel at solving problems and turning natural language into functioning code. You speak efficiently and format your code properly.",
            },
            {
              role: "user",
              content: userText,
            },
          ];
        }

        // Send the message history to the API to get the assistant's response
        const gptResponse = await sendMessageHistoryToGPT(
          messageHistoryForGPT,
          session.user.apiKey
        );

        messageHistoryForGPT.push(gptResponse.choices[0].message);
        // If there's no selected chat, create a new chat with the given message history
        if (!selectedChat) {
          const newChat = {
            userId: session.user.id,
            id: gptResponse.id,
            title: userText,
            messages: messageHistoryForGPT,
          };
          await createChat(newChat);
          setSelectedChat(gptResponse.id);
        } else {
          // If there's a selected chat, update it with the new message history
          const updatedChat = {
            userId: session.user.id,
            id: selectedChat,
            messages: messageHistoryForGPT,
          };
          await updateChat(updatedChat, setChats);
        }
        const updatedChats = await fetchChats(session.user.id);
        setChats(updatedChats);
        setLoading(false);
        setShowRegen(true);
      } catch (error) {
        setShowRegen(true);
        setError(error);
        setLoading(false);
      }
    } else {
      console.error("Please enter a valid prompt");
    }
  };

  const handleRegen = async () => {
    if (selectedChat) {
      setLoading(true);
      setError(null);
      try {
        const chatIndex = chats.findIndex((chat) => chat.id === selectedChat);
        const updatedChat = { ...chats[chatIndex] };

        const messageHistoryForGPT = updatedChat.messages
          .slice(0, -1)
          .map((message) => ({
            role: message.role,
            content: message.content,
          }));
        //edit chats
        const gptResponse = await sendMessageHistoryToGPT(
          messageHistoryForGPT,
          session.user.apiKey
        );

        messageHistoryForGPT.push(gptResponse.choices[0].message);

        updatedChat.messages = messageHistoryForGPT;
        // Update the chat in the database with the new message history
        await updateChat(updatedChat);

        const updatedChats = await fetchChats();
        // Update the local state with the new chat data
        setChats(updatedChats);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="pl-[260px] absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient dark:bg-gray-800  dark:md:bg-vert-dark-gradient pt-8">
      <RegenResponseButton
        handleRegen={handleRegen}
        loading={loading}
        showRegen={showRegen}
      />
      <PromptForm
        userText={userText}
        setUserText={setUserText}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
export default PromptActions;
