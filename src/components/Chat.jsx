import React, { useState } from "react";

const ChatButton = () => {
  // 使用 useState 來管理聊天框的開關狀態、訊息列表和輸入的訊息
  const [isChatOpen, setIsChatOpen] = useState(false); // 控制聊天框的開關
  const [messages, setMessages] = useState([]); // 用來儲存訊息
  const [inputMessage, setInputMessage] = useState(""); // 用來儲存輸入的訊息

  // 切換聊天框顯示狀態
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // 處理訊息發送
  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // 加入用戶訊息
    setMessages([...messages, { from: "user", text: inputMessage }]);

    // 清空輸入框
    setInputMessage("");

    // 加入 AI 回應
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        from: "ai",
        text: (
          <div>
            <strong>這裡有一間讓您參考的咖啡廳：</strong>
            <br />
            <strong>喫享咖啡館</strong>
            <br />
            地址:台北市大安區復興南路二段9號
            <br />
            營業時間:11:00 ~ 20:00
            <br />
            簡介：有許多種類的咖啡，環境輕鬆
          </div>
        ),
      },
    ]);
  };

  // 內嵌樣式
  const styles = {
    chatButton: {
      fontSize: "24px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "50%",
      padding: "10px 15px",
      cursor: "pointer",
      position: "fixed",
      bottom: "20px",
      right: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    chatBox: {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      maxWidth: "400px",
      width: "100%",
      backgroundColor: "#f1f1f1",
      borderRadius: "8px",
      padding: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    chatHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    chatContent: {
      maxHeight: "300px",
      overflowY: "auto",
    },
    message: {
      display: "flex",
      marginBottom: "10px",
      alignItems: "center",
    },
    messageUser: {
      justifyContent: "flex-end", // 用戶訊息在右邊
    },
    messageAi: {
      justifyContent: "flex-start", // AI 訊息在左邊
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      color: "white",
      marginRight: "10px",
    },
    avatarUser: {
      backgroundColor: "#4caf50", // 用戶頭像顏色
    },
    avatarAi: {
      backgroundColor: "#007bff", // AI 頭像顏色
    },
    messageText: {
      backgroundColor: "#ffffff",
      padding: "10px",
      borderRadius: "10px",
      maxWidth: "80%",
    },
    messageTextAi: {
      backgroundColor: "#d1e7ff",
    },
    messageTextUser: {
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc", // 訊息框顯示邊框
    },
    chatInput: {
      display: "flex",
      alignItems: "center",
    },
    chatInputField: {
      width: "80%",
      padding: "10px",
      marginRight: "10px",
      borderRadius: "20px",
      border: "1px solid #ddd",
    },
    chatInputButton: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "20px",
      color: "white",
      cursor: "pointer",
    },
    chatInputButtonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div>
      <button
        style={styles.chatButton}
        title="與 AI 對話"
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="28"
          height="28"
        >
          <path d="M2 21l1.9-5.7C2.7 14 2 12.6 2 11c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8c-1.2 0-2.3-.2-3.3-.5L2 21z" />
        </svg>
      </button>

      {isChatOpen && (
        <div style={styles.chatBox}>
          <div style={styles.chatHeader}>
            <h3>Chat with AI</h3>
            <button onClick={toggleChat}>✕</button>
          </div>
          <div style={styles.chatContent}>
            {/* 顯示所有訊息 */}
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(message.from === "user"
                    ? styles.messageUser
                    : styles.messageAi),
                }}
              >
                {/* 顯示不同的頭像 */}
                <div style={styles.avatar}>
                  <div
                    style={{
                      ...(message.from === "user"
                        ? styles.avatarUser
                        : styles.avatarAi),
                    }}
                  >
                    {message.from === "user" ? "User" : "AI"}
                  </div>
                </div>
                <div
                  style={{
                    ...styles.messageText,
                    ...(message.from === "user"
                      ? styles.messageTextUser
                      : styles.messageTextAi),
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div style={styles.chatInput}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              style={styles.chatInputField}
            />
            <button
              onClick={sendMessage}
              style={styles.chatInputButton}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = styles.chatInputButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = styles.chatInputButton.backgroundColor)
              }
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
