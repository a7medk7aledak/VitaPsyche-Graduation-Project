"use client";
import Navbar from "@components/common/Navbar";
import { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperPlane,
  FaPlus,
  FaHistory,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

// Declare the global SpeechRecognition for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// Type definition for SpeechRecognition
type SpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
};

type SpeechRecognitionEvent = {
  results: { [key: number]: { [key: number]: { transcript: string } } };
};

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: string; text: string; lang: string }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<string>("Chat 1");
  const [chats, setChats] = useState<string[]>(["Chat 1"]);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.continuous = false;
      newRecognition.interimResults = false;

      newRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      newRecognition.onerror = (event: Event) => {
        console.error("Speech recognition error:", (event as ErrorEvent).error);
        setIsListening(false);
      };

      setRecognition(newRecognition);
    }
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isHistoryVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsHistoryVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isHistoryVisible]);

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { sender: "user", text: input, lang: language };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.response, lang: language },
        ]);
      } catch (error) {
        console.error("Error communicating with the chatbot:", error);
      }

      setInput("");
    }
  };

  const handleSpeechToText = () => {
    if (recognition) {
      recognition.lang = language;

      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const openChat = (chatName: string) => {
    setActiveChat(chatName);
    setMessages([]);
    setIsHistoryVisible(false);
  };

  const addNewChat = () => {
    const newChatName = `Chat ${chats.length + 1}`;
    setChats([...chats, newChatName]);
    openChat(newChatName);
  };

  return (
    <div className="flex flex-col h-screen bg-[#dce9e6] relative">
      <Navbar />

      {/* Blur Overlay for Mobile when History is Visible */}
      {isHistoryVisible && (
        <div
          className="blur-overlay fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsHistoryVisible(false)}
        ></div>
      )}

      <div className="flex flex-1">
        {/* Chat History Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed lg:relative z-40 top-0 left-0 h-full lg:w-1/6 bg-slate-800 rounded-md transition-transform transform ${
            isHistoryVisible
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">History</h2>
              {/* Close Button in Sidebar - Visible only on Mobile */}
              <button
                onClick={() => setIsHistoryVisible(false)}
                className="lg:hidden text-white bg-gray-700 p-1 rounded-full hover:bg-gray-600"
              >
                <FaHistory />
              </button>
            </div>

            <div className="space-y-4">
              {chats.map((chat, index) => (
                <button
                  key={index}
                  onClick={() => openChat(chat)}
                  className={`w-full text-left p-2 rounded-md ${
                    activeChat === chat ? "bg-[#46e4dc]" : "bg-heading"
                  }`}
                >
                  {chat}
                </button>
              ))}

              {/* Add New Chat Button */}
              <button
                onClick={addNewChat}
                className="w-full flex items-center justify-center p-2 mt-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
              >
                <FaPlus className="mr-2" /> Add New Chat
              </button>
            </div>
          </div>

          {/* Language Selector and Username Button at the Bottom */}
          <div className="absolute bottom-0 w-full p-6 space-y-2 bg-slate-800">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-2 border border-[#67e6c6] rounded-md focus:ring-2 focus:ring-[#58ddbc] focus:outline-none bg-slate-800 text-white"
            >
              <option value="en-US">English (US)</option>
              <option value="ar-SA">Arabic</option>
            </select>
            <button className="w-full p-2 text-white font-semibold border border-[#67e6c6] rounded-lg">
              Belal Ahmed
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col lg:w-3/4 bg-white rounded-md shadow-md">
          {/* Chat Header with Active Chat Name */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-700">
              {activeChat}
            </h3>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md p-4 rounded-lg shadow-md ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white"
                      : "bg-green-200 text-gray-900"
                  } ${msg.lang === "ar-SA" ? "text-right" : "text-left"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input and Control Section */}
          <div className="flex items-center p-2 border-t border-heading bg-green-100 space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === "ar-SA" ? "...اكتب رسالتك" : "Type your message..."
              }
              className={`flex-grow p-2 rounded-full border border-heading focus:outline-none ${
                language === "ar-SA" ? "text-right" : "text-left"
              }`}
            />
            <button
              onClick={handleSendMessage}
              className={`p-2 rounded-full ${
                input.trim() ? "bg-green-500" : "bg-gray-500"
              } text-white`}
              disabled={!input.trim()}
            >
              <FaPaperPlane />
            </button>
            <button
              onClick={handleSpeechToText}
              className={`p-2 rounded-full text-white ${
                isListening ? "bg-red-500" : "bg-blue-600"
              }`}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button
              onClick={() => setIsHistoryVisible(!isHistoryVisible)}
              className="lg:hidden p-2 rounded-full text-white bg-gray-700"
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
