import React, { useState, useEffect } from "react";
import PromptForm from "./PromptForm";
import RegenResponseButton from "./RegenResponseButton";
import { fetchChats, createChat, updateChat } from "../../../utils/chatUtils";
import { sendMessageHistoryToGPT } from "../../../utils/gptUtils";

function PromptActions({
  session,
  setError,
  userText,
  selectedModel,
  setUserText,
  chats,
  setChats,
  selectedChat,
  setSelectedChat,
}) {
  const [loading, setLoading] = useState(false);
  const [showRegen, setShowRegen] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      //  change to selectedChat.messages
      const selectedIndex = chats.findIndex(
        (chat) => chat._id === selectedChat
      );
      const chat = { ...chats[selectedIndex] };
      if (chat && chat.messages) {
        setShowRegen(true);
      }
    } else {
      setShowRegen(false);
    }
  }, [selectedChat, chats]);

  const createMessageData = async (e) => {
    let messageHistory = [];
    //  change to selectedChat.id
    let chatId = selectedChat;
    //  change to selectedChat.model
    let messageModel = selectedModel;
    if (selectedChat) {
      //change to selectedChat
      const selectedIndex = chats.findIndex(
        (chat) => chat._id === selectedChat
      );
      //change to selectedChat
      const updatedChat = { ...chats[selectedIndex] };
      messageModel = updatedChat.model;
      updatedChat.messages.push({
        role: "user",
        content: userText,
      });
      //  change to setSelectedChat(updatedChat), filter extra message properties
      let updatedChats = [...chats];
      updatedChats[selectedIndex] = updatedChat;
      setChats(updatedChats);
      messageHistory = updatedChat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));
    } else {
      const firstMessages = [
        {
          role: "system",
          content:
            "You are a positive and helpful AI assistant based on OpenAI's GPT-3.5-turbo model. You respond concisely and do not needlessly apologize. You write your code in markdown codeblocks and ask questions when you need more context to complete a task or answer a question accurately.",
        },
        {
          role: "user",
          content: userText,
        },
      ];
      const newChatData = {
        userId: session.user.id,
        title: userText,
        model: selectedModel,
        messages: firstMessages,
      };
      const newChat = await createChat(newChatData);
      //setSelectedChat(newChat)
      messageHistory = firstMessages;
      chatId = newChat._id;
      // only add id and title to chats
      setChats((prevChats) =>
        prevChats.length ? [...prevChats, newChat] : [newChat]
      );
      //remove
      setSelectedChat(chatId);
    }
    setUserText("");
    e.target.style.height = "auto";
    console.log(messageModel);
    return { chatId, messageModel, messageHistory };
  };

  const handleGPTResponse = async (chatId, messageData) => {
    const updatedChatData = {
      userId: session.user.id,
      messages: messageData,
    };
    const updatedChat = await updateChat(chatId, updatedChatData);
    //updated selectedChat.messages with gpt response
    setChats((prevChats) =>
      prevChats.map((chat) => (chat._id === chatId ? updatedChat : chat))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userText.length >= 1) {
      setLoading(true);
      setShowRegen(false);
      setError(null);
      try {
        // create Chat based on user prompt
        const messageData = await createMessageData(e);
        // send Chat message data to GPT API
        const gptResponse = await sendMessageHistoryToGPT({
          model: messageData.messageModel,
          messageHistory: messageData.messageHistory,
        });
        // update Chat with GPT response
        await handleGPTResponse(messageData.chatId, gptResponse);
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

        const messageData = updatedChat.messages
          .slice(0, -1)
          .map((message) => ({
            role: message.role,
            content: message.content,
          }));
        const gptResponse = await sendMessageHistoryToGPT({
          model: chats[selectedIndex].model,
          messageHistory: messageData,
        });
        messageData.push(gptResponse.choices[0].message);
        updatedChat.messages = messageData;
        await updateChat(selectedChat, updatedChat);
        //change to update selectedChat
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
    <div className="md:pl-[260px] absolute bottom-0 left-0 w-full pt-8 pb-24 md:pb-12 bg-vert-light-gradient dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradientborder-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent">
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
