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
      <div className="flex items-center justify-between text-[22px] p-5 text-[#585858] border-b border-[#eee] max-md:p-[15px] max-md:text-[18px]">
        <p>gemini</p>
        <img src={assets.user_icon} alt="user" className="w-10 rounded-full" />
      </div>

      <div className="flex-1 max-w-[900px] mx-auto p-0 px-5 overflow-y-auto">
        {!showResult ? (
          <>
            <div className="my-[50px] text-[56px] text-[#c4c7c5] font-medium p-5 text-center max-md:text-[28px] max-md:my-5">
              <p>
                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Hello, Shraddha
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[15px] p-5 max-md:p-[10px]">
              {" "}
              ...{" "}
            </div>
          </>
        ) : (
          <div className="p-0 px-[5%] max-h-[70vh] overflow-y-auto mb-5 [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="my-[40px] flex items-center gap-5">
              <img
                src={assets.user_icon}
                alt="user"
                className="w-10 rounded-full"
              />
              <p className="text-[17px] font-normal text-[#424242] leading-[1.5]">
                {recentPrompt}
              </p>
            </div>
            <div className="flex items-start gap-5 mb-5">
              <img
                src={assets.gemini_icon}
                alt="gemini"
                className="w-10 rounded-full mt-[5px]"
              />
              {loading ? (
                <div className="w-full flex flex-col gap-[10px]">
                  <hr className="rounded-sm border-none bg-gradient-to-r from-[#9ed7ff] from-[-800px] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-[loader_3s_infinite_linear]" />
                  <hr className="rounded-sm border-none bg-gradient-to-r from-[#9ed7ff] from-[-800px] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-[loader_3s_infinite_linear]" />
                  <hr className="rounded-sm border-none bg-gradient-to-r from-[#9ed7ff] from-[-800px] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-[loader_3s_infinite_linear]" />
                </div>
              ) : (
                <p
                  className="text-[17px] font-light leading-[1.8] text-[#333] whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🚀 This stays outside so it never scrolls */}
      <div className="border-t border-[#eee] p-[15px_20px] max-md:p-[10px] bg-white sticky bottom-0 max-w-[900px] mx-auto">
        <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] p-[10px_20px] rounded-[50px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none p-2 text-[18px] text-[#424242] placeholder:text-[#9ca3af]"
          />
          <div className="flex items-center gap-[15px]">
            <img
              src={assets.gallery_icon}
              alt="gallery"
              className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
            <img
              src={assets.mic_icon}
              alt="mic"
              className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
            {input ? (
              <img
                onClick={handleSend}
                src={assets.send_icon}
                alt="send"
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
              />
            ) : null}
          </div>
        </div>
        <p className="text-[13px] mt-[10px] text-center font-light text-[#65676b]">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Main;
