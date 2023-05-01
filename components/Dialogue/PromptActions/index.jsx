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

  const createMessageHistoryForGPT = () => {
    if (selectedChat) {
      const selectedIndex = chats.findIndex((chat) => chat.id === selectedChat);
      const updatedChat = { ...chats[selectedIndex] };
      updatedChat.messages.push({
        role: "user",
        content: userText,
      });
      return updatedChat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));
    } else {
      return [
        {
          role: "system",
          content:
            "You are a helpful AI based on OpenAI's GPT-4 model. You write your code in markdown codeblocks and ask questions when you need more context to complete a task or answer a question accurately.",
        },
        {
          role: "user",
          content: userText,
        },
      ];
    }
  };

  const handleGPTResponse = async (gptResponse, messageHistoryForGPT) => {
    messageHistoryForGPT.push(gptResponse.choices[0].message);

    if (!selectedChat) {
      const newChat = {
        userId: session.user.id,
        id: gptResponse.id,
        title: userText,
        messages: messageHistoryForGPT,
      };
      await createChat(newChat);
      setSelectedChat(gptResponse.id);
      setChats((prevChats) => [...prevChats, newChat]);
    } else {
      const chatIndex = chats.findIndex((chat) => chat.id === selectedChat);
      const updatedChat = {
        userId: session.user.id,
        id: selectedChat,
        messages: messageHistoryForGPT,
      };
      await updateChat(selectedChat, updatedChat);
      updatedChat.title = chats[chatIndex].title;
      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === selectedChat ? updatedChat : chat))
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userText.length >= 1) {
      setLoading(true);
      setUserText("");
      setError(null);
      try {
        const messageHistoryForGPT = createMessageHistoryForGPT();
        const gptResponse = await sendMessageHistoryToGPT(
          messageHistoryForGPT,
          session.user.apiKey
        );
        await handleGPTResponse(gptResponse, messageHistoryForGPT);
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
    <div className="md:pl-[289px] absolute bottom-0 left-0 w-full border-t  md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-8">
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
      <div className="h-[5rem] md:h-6 w-4/5 flex justify-center mx-auto pb-10 lg:pb-4">
        <span className="text-[0.6rem] font-semibold text-gray-600 text-center">
          MyGPT is not affiliated with OpenAI. MyGPT is an open source project
          modeled after ChatGPT. MyGPT may produce inaccurate information.
        </span>
      </div>
    </div>
  );
}
export default PromptActions;
