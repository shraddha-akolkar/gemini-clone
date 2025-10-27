// src/components/Sidebar/Sidebar.jsx
import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="min-h-screen inline-flex flex-col justify-between bg-[#f0f4f9] p-[25px_15px] transition-all duration-300 shadow-[2px_0_10px_rgba(0,0,0,0.1)] min-w-[250px] max-w-[250px] max-md:min-w-[60px] max-md:max-w-[60px] max-md:p-5">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          className="block ml-[10px] max-md:ml-[5px] cursor-pointer p-2 rounded-full transition-all duration-200 hover:bg-[#e2e6eb] w-5 hover:scale-110"
          alt="menu"
        />
        <div
          onClick={() => newChat()}
          className="inline-flex items-center gap-[10px] px-[15px] py-3 max-md:px-[10px] max-md:justify-center max-md:mt-[30px] max-md:mb-[15px] bg-[#e6eaf1] rounded-[50px] text-sm text-[#5f6368] cursor-pointer transition-all duration-300 font-medium hover:bg-[#d2e3fc] hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        >
          <img src={assets.plus_icon} alt="plus" className="w-[18px]" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div
            className="flex flex-col max-h-[50vh] overflow-y-auto"
            style={{
              scrollbarWidth: "4px",
              scrollbarTrackColor: "transparent",
              scrollbarThumbColor: "#c1c7cd",
              scrollbarThumbRadius: "4px",
            }}
          >
            <p className="mt-[30px] mb-5 text-sm text-[#5f6368] font-semibold uppercase tracking-[0.5px]">
              Recent
            </p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="flex items-center px-[10px_20px] py-3 rounded-[25px] gap-[10px] text-[#3c4043] cursor-pointer mb-[5px] transition-all duration-200 hover:bg-[#e8eaed] hover:translate-x-[2px] text-sm"
                  key={index}
                >
                  <img
                    src={assets.message_icon}
                    alt="message"
                    className="w-[18px] opacity-70"
                  />
                  <p className="font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.slice(0, 18)} ...
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="px-[10px_20px] py-3 cursor-pointer rounded-[25px] transition-all duration-200 hover:bg-[#e8eaed] flex items-center gap-[10px]">
          <img
            src={assets.question_icon}
            alt="help"
            className="w-5 opacity-70 transition-transform duration-200 hover:scale-110"
          />
          {extended ? (
            <p className="text-sm font-normal text-[#3c4043]">Help</p>
          ) : null}
        </div>

        <div className="px-[10px_20px] py-3 cursor-pointer rounded-[25px] transition-all duration-200 hover:bg-[#e8eaed] flex items-center gap-[10px]">
          <img
            src={assets.history_icon}
            alt="activity"
            className="w-5 opacity-70 transition-transform duration-200 hover:scale-110"
          />
          {extended ? (
            <p className="text-sm font-normal text-[#3c4043]">Activity</p>
          ) : null}
        </div>

        <div className="px-[10px_20px] py-3 cursor-pointer rounded-[25px] transition-all duration-200 hover:bg-[#e8eaed] flex items-center gap-[10px]">
          <img
            src={assets.setting_icon}
            alt="settings"
            className="w-5 opacity-70 transition-transform duration-200 hover:scale-110"
          />
          {extended ? (
            <p className="text-sm font-normal text-[#3c4043]">Settings</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
