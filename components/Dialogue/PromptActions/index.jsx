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

  const createMessageHistoryForGPT = async (e) => {
    let gptMessages = [];
    let chatId = selectedChat;
    if (selectedChat) {
      const selectedIndex = chats.findIndex(
        (chat) => chat._id === selectedChat
      );
      const updatedChat = { ...chats[selectedIndex] };
      updatedChat.messages.push({
        role: "user",
        content: userText,
      });
      let updatedChats = [...chats];
      updatedChats[selectedIndex] = updatedChat;
      setChats(updatedChats);
      gptMessages = updatedChat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));
    } else {
      const firstMessages = [
        {
          role: "system",
          content:
            "You are a helpful AI based on OpenAI's GPT model. You write your code in markdown codeblocks and ask questions when you need more context to complete a task or answer a question accurately. You do not needlessly apologize",
        },
        {
          role: "user",
          content: userText,
        },
      ];
      const newChatData = {
        userId: session.user.id,
        title: userText,
        messages: firstMessages,
      };
      const newChat = await createChat(newChatData);
      gptMessages = firstMessages;
      chatId = newChat._id;
      setChats((prevChats) =>
        prevChats.length ? [...prevChats, newChat] : [newChat]
      );
      setSelectedChat(chatId);
    }
    setUserText("");
    e.target.style.height = "auto";
    return { chatId, gptMessages };
  };

  const handleGPTResponse = async (chatId, messageHistoryForGPT) => {
    const updatedChatData = {
      userId: session.user.id,
      messages: messageHistoryForGPT,
    };
    const updatedChat = await updateChat(chatId, updatedChatData);
    setChats((prevChats) =>
      prevChats.map((chat) => (chat._id === chatId ? updatedChat : chat))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userText.length >= 1) {
      setLoading(true);
      setError(null);
      try {
        const messageHistoryForGPT = await createMessageHistoryForGPT(e);
        const gptResponse = await sendMessageHistoryToGPT(
          messageHistoryForGPT.gptMessages
        );
        await handleGPTResponse(messageHistoryForGPT.chatId, gptResponse);
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
        const chatIndex = chats.findIndex((chat) => chat._id === selectedChat);
        const updatedChat = { ...chats[chatIndex] };

        const messageHistoryForGPT = updatedChat.messages
          .slice(0, -1)
          .map((message) => ({
            role: message.role,
            content: message.content,
          }));
        const gptResponse = await sendMessageHistoryToGPT(messageHistoryForGPT);
        messageHistoryForGPT.push(gptResponse.choices[0].message);
        updatedChat.messages = messageHistoryForGPT;
        await updateChat(selectedChat, updatedChat);
        const updatedChats = await fetchChats();
        setChats(updatedChats);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="md:pl-[289px] absolute bottom-0 left-0 w-full border-t  md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient py-2 md:py-0 md:pt-8">
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
      <div className="h-[5rem] md:h-12 w-4/5 flex justify-center items-center mx-auto lg:pb-4">
        <span className="text-sm font-semibold text-gray-600 text-center">
          MyGPT is not affiliated with OpenAI. MyGPT is an open source project
          modeled after ChatGPT. MyGPT may produce inaccurate information.
        </span>
      </div>
    </div>
  );
}
export default PromptActions;
