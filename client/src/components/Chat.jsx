import { useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content) => {
    const userMessage = {
      role: "user",
      content
    };

    const updatedMessages = [
      ...messages,
      userMessage
    ];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messages: updatedMessages
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      if (!response.body) {
        throw new Error("Response body is empty");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiResponse = "";

      // Add empty AI message first
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: ""
        }
      ]);

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, {
          stream: true
        });

        aiResponse += chunk;

        setMessages((previousMessages) => {
          const updated = [...previousMessages];

          updated[updated.length - 1] = {
            role: "assistant",
            content: aiResponse
          };

          return updated;
        });
      }

    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't generate a response. Please try again."
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">

      <div className="chat-topbar">
        <span>Conversation</span>

        <button
          className="clear-button"
          onClick={clearChat}
        >
          New Chat
        </button>
      </div>

      <div className="messages-container">

        {messages.length === 0 && (
          <div className="welcome">
            <h2>How can I help you?</h2>

            <p>
              Ask me anything about programming,
              technology, study topics, or general questions.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading && (
          <div className="typing">
            AI is thinking...
          </div>
        )}

      </div>

      <ChatInput
        onSend={sendMessage}
        loading={loading}
      />

    </div>
  );
}

export default Chat;