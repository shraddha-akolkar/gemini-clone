// src/components/Sidebar/Sidebar.jsx
import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = ({ extended, setExtended }) => {
  const { newChat, conversations, loadConversation, currentConversation } =
    useContext(Context);

  const handleConversationClick = (conversationId) => {
    loadConversation(conversationId);
  };

  return (
    <div
      className={`min-h-screen inline-flex flex-col justify-between bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 shadow-xl border-r border-slate-700/50 transition-all duration-300 ${
        extended ? "min-w-[300px] max-w-[300px]" : "min-w-[80px] max-w-[80px]"
      } max-md:min-w-[80px] max-md:max-w-[80px]`}
      style={{ padding: extended ? "1.5rem" : "1rem" }}
    >
      {/* Top Section */}
      <div className="top flex-1 overflow-hidden flex flex-col">
        {/* Logo and Menu */}
        <div
          className="flex items-center gap-3"
          style={{ marginBottom: "2rem" }}
        >
          <div
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 shadow-xl shadow-blue-500/30 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
            style={{ padding: "0.625rem" }}
          >
            <img
              src={assets.gemini_icon}
              className="w-full h-full"
              alt="gemini"
            />
          </div>
          {extended && (
            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Gemini
            </h1>
          )}
          <button
            onClick={() => setExtended((prev) => !prev)}
            className="ml-auto p-2.5 rounded-xl hover:bg-slate-700/80 transition-all duration-200 hover:scale-110 active:scale-95 group"
          >
            <img
              src={assets.menu_icon}
              className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
              alt="menu"
            />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => newChat()}
          className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl cursor-pointer transition-all duration-300 font-semibold shadow-lg border border-blue-200 hover:shadow-xl hover:scale-[1.02] hover:from-blue-100 hover:to-purple-100 active:scale-[0.97] group relative overflow-hidden"
          style={{
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            paddingTop: "0.875rem",
            paddingBottom: "0.875rem",
          }}
        >
          <span className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
              <img
                src={assets.plus_icon}
                alt="plus"
                className="w-5 h-5 filter brightness-0 invert"
              />
            </div>
            {extended && (
              <span className="text-sm font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                New Chat
              </span>
            )}
          </div>
        </button>

        {/* Recent Chats */}
        {extended && (
          <div
            className="flex-1 overflow-hidden flex flex-col"
            style={{ marginTop: "1.5rem" }}
          >
            <p
              className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"
              style={{
                marginBottom: "0.75rem",
                paddingLeft: "0.25rem",
                paddingRight: "0.25rem",
              }}
            >
              <span className="w-px h-3 bg-slate-300"></span>
              Recent Chats
              <span className="flex-1 h-px bg-linear-to-r from-slate-300 to-transparent"></span>
            </p>
            <div
              className="flex flex-col flex-1 overflow-y-auto space-y-1.5"
              style={{ paddingRight: "0.5rem", scrollbarGutter: "stable" }}
            >
              {conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <button
                    onClick={() => handleConversationClick(conversation.id)}
                    key={conversation.id}
                    className={`flex items-center gap-3 rounded-xl text-left text-slate-300 cursor-pointer transition-all duration-200 group relative ${
                      currentConversation?.id === conversation.id
                        ? "bg-linear-to-r from-blue-600/30 to-purple-600/30 shadow-md border border-blue-500/50"
                        : "hover:bg-slate-700/50 hover:shadow-sm"
                    }`}
                    style={{
                      paddingLeft: "0.75rem",
                      paddingRight: "0.75rem",
                      paddingTop: "0.625rem",
                      paddingBottom: "0.625rem",
                    }}
                  >
                    <div
                      className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
                        currentConversation?.id === conversation.id
                          ? "bg-linear-to-br from-blue-500 to-purple-600 shadow-md"
                          : "bg-linear-to-br from-slate-700 to-slate-600 group-hover:from-blue-600 group-hover:to-purple-600"
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
                    <p className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-slate-200">
                      {conversation.title}
                    </p>
                    {currentConversation?.id === conversation.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 to-purple-600 rounded-r-full"></div>
                    )}
                  </button>
                ))
              ) : (
                <div
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    paddingTop: "3rem",
                    paddingBottom: "3rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    <img
                      src={assets.message_icon}
                      alt="chat"
                      className="w-8 h-8 opacity-40"
                    />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">
                    No recent chats
                  </p>
                  <p
                    className="text-xs text-slate-500"
                    style={{ marginTop: "0.25rem" }}
                  >
                    Start a new conversation
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Menu */}
      <div className="flex flex-col gap-2" style={{ marginTop: "1rem" }}>
        <button
          className="w-full flex items-center gap-3 rounded-xl transition-all duration-200 hover:bg-slate-700/50 hover:shadow-sm group relative text-slate-300"
          style={{
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-700 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-200 shadow-sm group-hover:shadow-md">
            <img
              src={assets.question_icon}
              alt="help"
              className="w-5 h-5 brightness-0 invert"
            />
          </div>
          {extended && (
            <span className="text-sm font-semibold text-slate-200">
              Help & Support
            </span>
          )}
        </button>

        <button
          className="w-full flex items-center gap-3 rounded-xl transition-all duration-200 hover:bg-slate-700/50 hover:shadow-sm group text-slate-300"
          style={{
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-700 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-200 shadow-sm group-hover:shadow-md">
            <img
              src={assets.history_icon}
              alt="activity"
              className="w-5 h-5 brightness-0 invert"
            />
          </div>
          {extended && (
            <span className="text-sm font-semibold text-slate-200">
              Activity
            </span>
          )}
        </button>

        <button
          className="w-full flex items-center gap-3 rounded-xl transition-all duration-200 hover:bg-slate-700/50 hover:shadow-sm group text-slate-300"
          style={{
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-700 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-200 shadow-sm group-hover:shadow-md">
            <img
              src={assets.setting_icon}
              alt="settings"
              className="w-5 h-5 brightness-0 invert"
            />
          </div>
          {extended && (
            <span className="text-sm font-semibold text-slate-200">
              Settings
            </span>
          )}
        </button>

        {/* User Profile */}
        <div
          className="border-t border-slate-700"
          style={{ marginTop: "0.75rem", paddingTop: "0.75rem" }}
        >
          <button
            className="w-full flex items-center gap-3 rounded-xl transition-all duration-200 hover:bg-slate-700/50 hover:shadow-sm group"
            style={{
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              paddingTop: "0.625rem",
              paddingBottom: "0.625rem",
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden shadow-md ring-2 ring-white">
              <img
                src={assets.user_icon}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
            {extended && (
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-bold text-slate-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  User Account
                </span>
                <span className="text-xs text-slate-400">user@example.com</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
