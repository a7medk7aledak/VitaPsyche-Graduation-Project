"use client";
import { useState } from "react";

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        // Send the message to the API route in Next.js
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        // Get the response from the chatbot and update the messages
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.response },
        ]);
      } catch (error) {
        console.error("Error communicating with the chatbot:", error);
      }

      // Clear the input after sending the message
      setInput("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Chat History */}
      <div className="w-1/4 bg-gray-800 p-4">
        <h2 className="text-white text-xl mb-4">Chat History</h2>
        <div className="space-y-2">
          <button className="w-full text-left text-gray-200 bg-gray-600 p-2 rounded-md">
            Chat 1
          </button>
          <button className="w-full text-left text-gray-200 bg-gray-600 p-2 rounded-md">
            Chat 2
          </button>
          <button className="w-full text-left text-gray-200 bg-gray-600 p-2 rounded-md">
            Chat 3
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-grow flex flex-col bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-[#00BFA6] mb-4">
          Chatbot
        </h1>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto mb-4 p-4 border border-gray-300 rounded-lg bg-white space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-[#00BFA6] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <strong>{msg.sender === "user" ? "You" : "MindMed"}:</strong>{" "}
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#00BFA6] text-white p-3 rounded-r-lg hover:bg-[#009688] transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
