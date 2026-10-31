import React, { useState } from "react";

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat box visibility
  };

  return (
    <div>
      <button className="chat-button" title="與 AI 對話" onClick={toggleChat}>
        💬
      </button>

      {isChatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Chat with AI</h3>
            <button onClick={toggleChat}>✕</button>
          </div>
          <div className="chat-content">
            {/* Your chat content goes here */}
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
