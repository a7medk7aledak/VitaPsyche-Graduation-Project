import React from "react";
import { Message } from "@myTypes/chat";

interface ChatMessagesProps {
  messages: Message[];
  language: string;
  isLoading?: boolean;
}

const LoadingDots = () => {
  return (
    <div className="flex items-center">
      <span
        className="text-black"
        style={{ display: "inline", visibility: "visible", opacity: 1 }}
      >
        thinking
      </span>
      <div className="flex space-x-1 ml-1">
        <div
          className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
};

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
}) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.sender === "user"
                ? "bg-[#2c7a6b] text-white"
                : "bg-[#dce9e6] text-gray-800"
            }`}
          >
            <div className="whitespace-pre-line">{message.text}</div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-4 bg-[#dce9e6] text-gray-800">
            <LoadingDots />
          </div>
        </div>
      )}
    </div>
  );
};
