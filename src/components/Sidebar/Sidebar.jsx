// src/components/Sidebar/Sidebar.jsx
import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    conversations,
    loadConversation,
    currentConversation,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const handleConversationClick = (conversationId) => {
    loadConversation(conversationId);
  };

  return (
    <div className="min-h-screen inline-flex flex-col justify-between bg-gradient-to-b from-white to-slate-50 p-6 transition-all duration-300 shadow-lg border-r border-slate-200/60 min-w-[280px] max-w-[280px] max-md:min-w-[72px] max-md:max-w-[72px] max-md:p-3">
      {/* Top Section */}
      <div className="top flex-1 overflow-hidden flex flex-col">
        {/* Logo and Menu */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-blue-500/25 p-2 backdrop-blur-sm">
            <img
              src={assets.gemini_icon}
              className="w-full h-full"
              alt="gemini"
            />
          </div>
          {extended && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gemini
            </h1>
          )}
          <button
            onClick={() => setExtended((prev) => !prev)}
            className="ml-auto p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 hover:scale-110 active:scale-95 max-md:ml-0"
          >
            <img src={assets.menu_icon} className="w-5 h-5" alt="menu" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => newChat()}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 max-md:px-2 max-md:py-2.5 max-md:gap-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl cursor-pointer transition-all duration-300 font-semibold shadow-sm border border-blue-100/50 hover:shadow-lg hover:scale-[1.02] hover:from-blue-100 hover:to-purple-100 active:scale-[0.97] group relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-110">
              <img
                src={assets.plus_icon}
                alt="plus"
                className="w-5 h-5 filter brightness-0 invert"
              />
            </div>
            {extended && (
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                New Chat
              </span>
            )}
          </div>
        </button>

        {/* Recent Chats */}
        {extended && (
          <div className="mt-6 flex-1 overflow-hidden flex flex-col">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
              <span className="w-px h-3 bg-slate-300"></span>
              Recent Chats
              <span className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></span>
            </p>
            <div
              className="flex flex-col flex-1 overflow-y-auto pr-2 space-y-1.5"
              style={{ scrollbarGutter: "stable" }}
            >
              {conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <button
                    onClick={() => handleConversationClick(conversation.id)}
                    key={conversation.id}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-slate-700 cursor-pointer transition-all duration-200 group relative ${
                      currentConversation?.id === conversation.id
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm border border-blue-100"
                        : "hover:bg-slate-50 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
                        currentConversation?.id === conversation.id
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-md"
                          : "bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100"
                      }`}
                    >
                      <img
                        src={assets.message_icon}
                        alt="message"
                        className={`w-4 h-4 ${
                          currentConversation?.id === conversation.id
                            ? "filter brightness-0 invert"
                            : ""
                        }`}
                      />
                    </div>
                    <p className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                      {conversation.title}
                    </p>
                    {currentConversation?.id === conversation.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full"></div>
                    )}
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-3">
                    <img
                      src={assets.message_icon}
                      alt="chat"
                      className="w-8 h-8 opacity-40"
                    />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">
                    No recent chats
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Start a new conversation
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Menu */}
      <div className="flex flex-col gap-2 mt-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50 hover:shadow-sm group relative">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-200 shadow-sm group-hover:shadow-md">
            <img src={assets.question_icon} alt="help" className="w-5 h-5" />
          </div>
          {extended && (
            <span className="text-sm font-semibold text-slate-700">
              Help & Support
            </span>
          )}
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50 hover:shadow-sm group">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-200 shadow-sm group-hover:shadow-md">
            <img src={assets.history_icon} alt="activity" className="w-5 h-5" />
          </div>
          {extended && (
            <span className="text-sm font-semibold text-slate-700">
              Activity
            </span>
          )}
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50 hover:shadow-sm group">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-200 shadow-sm group-hover:shadow-md">
            <img src={assets.setting_icon} alt="settings" className="w-5 h-5" />
          </div>
          {extended && (
            <span className="text-sm font-semibold text-slate-700">
              Settings
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="mt-3 pt-3 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50 hover:shadow-sm group">
            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden shadow-md ring-2 ring-white">
              <img
                src={assets.user_icon}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
            {extended && (
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-bold text-slate-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  User Account
                </span>
                <span className="text-xs text-slate-500">user@example.com</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
