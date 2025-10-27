import React, { useContext, useState } from "react";
import { Context } from "../context/Context";

const Chat = () => {
  const { messages, sendMessage } = useContext(Context);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen border border-[#ddd]">
      <div className="flex-1 overflow-y-auto p-[10px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-[10px] p-2 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-[#d1f0ff] self-end"
                : "bg-[#f0f0f0] self-start"
            }`}
          >
            <b>{msg.sender === "user" ? "You" : "Gemini"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex p-[10px] border-t border-[#ddd] bg-white">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-[10px] border border-[#ccc] rounded-md mr-2"
        />
        <button
          onClick={handleSend}
          className="px-4 py-[10px] border-none rounded-md bg-[#007bff] text-white cursor-pointer hover:bg-[#0056b3]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
