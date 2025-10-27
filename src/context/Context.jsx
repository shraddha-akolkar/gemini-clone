// src/context/Context.jsx
import React, { createContext, useState } from "react";
import { getGeminiResponse } from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  const newChat = () => {
    setShowResult(false);
    setLoading(false);
    setInput("");
    setResultData("");
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

    const response = await getGeminiResponse(finalPrompt);
    let formatted = response.replace(/\n/g, "<br/>");
    let words = formatted.split(" ");

    for (let i = 0; i < words.length; i++) {
      delayPara(i, words[i] + " ");
    }

    setLoading(false);
    setInput("");
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
