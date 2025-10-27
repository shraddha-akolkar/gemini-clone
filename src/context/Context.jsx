// src/context/Context.jsx
import React, { createContext, useState, useEffect } from "react";
import { getGeminiResponse } from "../config/gemini";

export const Context = createContext();

const STORAGE_KEY = "gemini_chat_history";
const CURRENT_CHAT_KEY = "gemini_current_chat";

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem(STORAGE_KEY);
    const savedCurrentChat = localStorage.getItem(CURRENT_CHAT_KEY);

    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed);

        // If there's a current chat ID and it exists, restore it
        if (savedCurrentChat && parsed.length > 0) {
          const currentChat = parsed.find((c) => c.id === savedCurrentChat);
          if (currentChat) {
            setCurrentConversation(currentChat);
            setPrevPrompts(currentChat.messages.map((m) => m.prompt));
            // Show the last message if any
            if (currentChat.messages.length > 0) {
              const lastMessage =
                currentChat.messages[currentChat.messages.length - 1];
              setRecentPrompt(lastMessage.prompt);
              setResultData(lastMessage.response);
              setShowResult(true);
            }
          }
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  // Save current conversation ID
  useEffect(() => {
    if (currentConversation) {
      localStorage.setItem(CURRENT_CHAT_KEY, currentConversation.id);
    }
  }, [currentConversation]);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  const saveToLocalStorage = (prompt, response) => {
    const chatHistory = conversations.find(
      (c) => c.id === currentConversation?.id
    );

    const message = {
      prompt,
      response,
      timestamp: new Date().toISOString(),
    };

    if (chatHistory) {
      // Add to existing conversation
      const updatedConversations = conversations.map((conv) =>
        conv.id === currentConversation.id
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      );
      setConversations(updatedConversations);
      setCurrentConversation({
        ...chatHistory,
        messages: [...chatHistory.messages, message],
      });
    } else {
      // Create new conversation
      const newConversation = {
        id: `conv_${Date.now()}`,
        title: prompt.slice(0, 30),
        messages: [message],
        timestamp: new Date().toISOString(),
      };
      setConversations((prev) => [newConversation, ...prev]);
      setCurrentConversation(newConversation);
    }
  };

  const newChat = () => {
    setShowResult(false);
    setLoading(false);
    setInput("");
    setResultData("");
    setRecentPrompt("");
    setCurrentConversation(null);
    localStorage.removeItem(CURRENT_CHAT_KEY);
  };

  const onSent = async (prompt) => {
    setShowResult(true);
    setLoading(true);
    setResultData("");

    let finalPrompt = prompt || input;
    setRecentPrompt(finalPrompt);

    if (!prompt) {
      setPrevPrompts((prev) => [...prev, finalPrompt]);
    }

    try {
      const response = await getGeminiResponse(finalPrompt);
      let formatted = response.replace(/\n/g, "<br/>");

      let words = formatted.split(" ");
      let totalDelay = words.length * 50;

      for (let i = 0; i < words.length; i++) {
        delayPara(i, words[i] + " ");
      }

      // Save to localStorage after typing animation completes
      setTimeout(() => {
        saveToLocalStorage(finalPrompt, formatted);
      }, totalDelay);

      setLoading(false);
      setInput("");
    } catch (error) {
      console.error("Error getting Gemini response:", error);
      setResultData("Sorry, there was an error processing your request.");
      setLoading(false);
      setInput("");
    }
  };

  const loadConversation = (conversationId) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      setPrevPrompts(conversation.messages.map((m) => m.prompt));
      // Show the last message if any
      if (conversation.messages.length > 0) {
        const lastMessage =
          conversation.messages[conversation.messages.length - 1];
        setRecentPrompt(lastMessage.prompt);
        setResultData(lastMessage.response);
        setShowResult(true);
      }
    }
  };

  const deleteConversation = (conversationId) => {
    const updatedConversations = conversations.filter(
      (c) => c.id !== conversationId
    );
    setConversations(updatedConversations);

    // If deleting current conversation, clear it
    if (currentConversation?.id === conversationId) {
      newChat();
    }
  };

  return (
    <Context.Provider
      value={{
        onSent,
        input,
        setInput,
        recentPrompt,
        prevPrompts,
        showResult,
        loading,
        resultData,
        newChat,
        setRecentPrompt,
        conversations,
        currentConversation,
        loadConversation,
        deleteConversation,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
