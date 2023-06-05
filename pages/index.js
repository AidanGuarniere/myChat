import React, { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import Dashboard from "../components/Dashboard";
import Dialogue from "../components/Dialogue";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchChatTitles } from "../utils/chatUtils";
import Footer from "../components/Footer";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userText, setUserText] = useState("");
  const [error, setError] = useState(null);
  const [selectedChatLoading, setSelectedChatLoading] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const errorRef = useRef();
  const chatsRef = useRef();

  useEffect(() => {
    if (errorRef.current !== error) {
      errorRef.current = error;
    }
  }, [error]);

  useEffect(() => {
    if (errorRef.current) {
      setError(null);
    }
  }, [chats, selectedChat]);

  useEffect(() => {
    if (chatsRef.length !== chats.length) {
      chatsRef.length = chats.length;
    }
  }, [chats]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (session && status === "authenticated") {
      const handleFetchChatTitles = async () => {
        try {
          const chatTitles = await fetchChatTitles();
          if (chatTitles.length !== chatsRef.length) {
            setChats(chatTitles);
          }
        } catch (error) {
          console.error("Error fetching chat titles:", error);
        }
      };

      handleFetchChatTitles();
    }
  }, [session, status, router, chatsRef]);

  const shouldFetchChatContent = useMemo(() => {
    const chat = chats.find((chat) => chat._id === selectedChat);
    return !chat || (chat && !chat.messages);
  }, [chats, selectedChat]);

  useEffect(() => {
    if (selectedChat !== null && shouldFetchChatContent) {
      setSelectedChatLoading(true);
      const fetchSelectedChat = async () => {
        try {
          const response = await axios.get(`/api/chats/${selectedChat}`);
          if (response.data) {
            const updatedChats = [...chats];
            const selectedIndex = updatedChats.findIndex(
              (chat) => chat._id === selectedChat
            );
            console.log(selectedIndex)
            updatedChats[selectedIndex] = response.data;
            setChats(updatedChats);
          }
        } catch (error) {
          setError(error);
          console.error("Error fetching selected chat:", error);
        } finally {
          setSelectedChatLoading(false);
        }
      };

      fetchSelectedChat();
    }
  }, [chats, selectedChat, shouldFetchChatContent]);

  return (
    <>
      <Head>
        <title>myChat</title>
        <meta name="description" content="page description here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen mx-auto overflow-hidden bg-white p-0">
        <Dashboard
          session={session}
          chats={chats}
          userText={userText}
          setUserText={setUserText}
          setChats={setChats}
          setError={setError}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
        <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
          {status === "authenticated" ? (
            <div className="flex overflow-x-hidden items-bottom w-full h-full">
              <Dialogue
                session={session}
                userText={userText}
                setUserText={setUserText}
                error={error}
                setError={setError}
                chats={chats}
                setChats={setChats}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                selectedChatLoading={selectedChatLoading}
                setSelectedChatLoading={setSelectedChatLoading}
              />
            </div>
          ) : (
            <h1 className="md:pl-[260px] text-4xl font-bold text-center dark:bg-gray-800 text-gray-300 dark:text-gray-600 ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center flex-grow ">
              myChat
            </h1>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
