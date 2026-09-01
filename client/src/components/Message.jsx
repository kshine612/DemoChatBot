function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "user-row" : "assistant-row"
      }`}
    >
      <div
        className={`message ${
          isUser ? "user-message" : "assistant-message"
        }`}
      >
        <div className="message-label">
          {isUser ? "You" : "AI Assistant"}
        </div>

        <div className="message-content">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Message;