// src/components/Main/Main.jsx
import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    currentConversation,
  } = useContext(Context);

  // const handleCardClick = (promptText) => {
  //   onSent(promptText);
  // }

  const handleSend = () => {
    if (input.trim()) {
      onSent();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim()) {
      onSent();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex items-center justify-between text-[22px] p-6 text-slate-800 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-10 max-md:p-4 max-md:text-[18px]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-blue-500/25 p-2">
            <img
              src={assets.gemini_icon}
              alt="gemini"
              className="w-full h-full"
            />
          </div>
          <p className="font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Gemini
          </p>
        </div>
        <div className="w-11 h-11 rounded-full ring-2 ring-blue-100 hover:ring-blue-300 transition-all duration-200 cursor-pointer overflow-hidden shadow-sm hover:shadow-md hover:scale-105">
          <img
            src={assets.user_icon}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 max-w-[900px] mx-auto p-0 px-5 overflow-y-auto">
        {!showResult &&
        (!currentConversation || currentConversation.messages.length === 0) ? (
          <>
            <div className="my-[60px] p-5 text-center max-md:my-8 animate-fade-in">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-blue-500/30 p-4 animate-pulse-slow">
                  <img
                    src={assets.gemini_icon}
                    alt="gemini"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <h1 className="text-6xl font-bold mb-4 max-md:text-4xl">
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Hello, there!
                </span>
              </h1>
              <p className="text-3xl text-slate-500 font-medium max-md:text-xl">
                How can I help you today?
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[15px] p-5 max-md:p-[10px]">
              {" "}
              ...{" "}
            </div>
          </>
        ) : (
          <div className="p-0 px-[5%] max-h-[70vh] overflow-y-auto mb-5 [scrollbar-width:none] [-ms-overflow-style:none]">
            {/* Display all saved messages from the conversation */}
            {currentConversation?.messages?.map((message, index) => (
              <div key={index} className="animate-fade-in-up">
                <div className="my-6 flex items-start gap-4 group">
                  <div className="w-9 h-9 rounded-full ring-2 ring-blue-100 overflow-hidden shadow-sm shrink-0">
                    <img
                      src={assets.user_icon}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[16px] font-semibold text-slate-800 leading-relaxed bg-linear-to-r from-blue-50 to-sky-50 px-5 py-4 rounded-2xl border border-blue-100 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      {message.prompt}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6 group">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-1.5 shadow-md shrink-0">
                    <img
                      src={assets.gemini_icon}
                      alt="gemini"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-[16px] font-normal leading-[1.75] text-slate-700 whitespace-pre-wrap bg-linear-to-br from-white to-purple-50/50 px-5 py-4 rounded-2xl border border-purple-100 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                      dangerouslySetInnerHTML={{ __html: message.response }}
                    ></p>
                  </div>
                </div>
              </div>
            ))}

            {/* Show current prompt and response only if it hasn't been saved yet */}
            {recentPrompt &&
              !currentConversation?.messages?.find(
                (msg) => msg.prompt === recentPrompt
              ) && (
                <div className="animate-fade-in-up">
                  <div className="my-6 flex items-start gap-4 group">
                    <div className="w-9 h-9 rounded-full ring-2 ring-blue-100 overflow-hidden shadow-sm shrink-0">
                      <img
                        src={assets.user_icon}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px] font-semibold text-slate-800 leading-relaxed bg-linear-to-r from-blue-50 to-sky-50 px-5 py-4 rounded-2xl border border-blue-100 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                        {recentPrompt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6 group">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-1.5 shadow-md shrink-0">
                      <img
                        src={assets.gemini_icon}
                        alt="gemini"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      {loading ? (
                        <div className="space-y-3">
                          <div className="h-5 rounded-xl bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 bg-size-[200%_auto] animate-[loader_2s_infinite_ease-in-out]" />
                          <div className="h-5 rounded-xl bg-linear-to-r from-purple-200 via-pink-200 to-blue-200 bg-size-[200%_auto] animate-[loader_2s_infinite_ease-in-out] delay-100" />
                          <div className="h-5 rounded-xl bg-linear-to-r from-pink-200 via-blue-200 to-purple-200 bg-size-[200%_auto] animate-[loader_2s_infinite_ease-in-out] delay-200" />
                        </div>
                      ) : (
                        resultData && (
                          <p
                            className="text-[16px] font-normal leading-[1.75] text-slate-700 whitespace-pre-wrap bg-linear-to-br from-white to-purple-50/50 px-5 py-4 rounded-2xl border border-purple-100 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                            dangerouslySetInnerHTML={{ __html: resultData }}
                          ></p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      {/* 🚀 This stays outside so it never scrolls */}
      <div className="border-t border-slate-200 p-6 max-md:p-4 bg-white/95 backdrop-blur-md sticky bottom-0 max-w-[900px] mx-auto shadow-xl z-10">
        <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Message Gemini..."
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none p-2 text-[16px] text-slate-700 placeholder:text-slate-400 font-normal"
          />
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-blue-50 transition-all duration-200 active:scale-90 group">
              <img
                src={assets.gallery_icon}
                alt="gallery"
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-purple-50 transition-all duration-200 active:scale-90 group">
              <img
                src={assets.mic_icon}
                alt="mic"
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </button>
            {input ? (
              <button
                onClick={handleSend}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <img
                  src={assets.send_icon}
                  alt="send"
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </button>
            ) : null}
          </div>
        </div>
        <p className="text-xs mt-3 text-center font-light text-slate-500">
          Gemini may display inaccurate info, including about people, so
          double-check its responses.{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Your privacy and Gemini Apps
          </span>
        </p>
      </div>
    </div>
  );
};

export default Main;
