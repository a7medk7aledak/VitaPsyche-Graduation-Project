"use client";
import Navbar from "@components/common/Navbar";
import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaBars, FaGlobe } from "react-icons/fa";

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
  const [messages, setMessages] = useState<{ sender: string; text: string; lang: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<string>("Chat 1");

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
      if (isHistoryVisible && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
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

  return (
    <div className="flex flex-col h-screen bg-[#dce9e6]">
      <Navbar  />

      <div className="flex flex-1">
        {/* Chat History Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed lg:relative z-40 top-0 left-0 h-full lg:w-1/6 bg-slate-800 rounded-md transition-transform transform ${
            isHistoryVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6 text-white">
            <h2 className="text-xl mb-4">History</h2>
            <div className="space-y-4">
              {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
                <button
                  key={index}
                  onClick={() => openChat(chat)}
                  className={`w-full text-left p-2 rounded-md ${
                    activeChat === chat ? "bg-green-600" : "bg-heading"
                  }`}
                >
                  {chat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col lg:w-3/4 bg-white rounded-md shadow-md">
          <div className="flex items-center p-4">
            <FaGlobe className="text-green-700 mr-2" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="p-2 border border-green-500 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="en-US">English (US)</option>
              <option value="ar-SA">Arabic</option>
            </select>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md p-4 rounded-lg shadow-md ${
                    msg.sender === "user" ? "bg-green-500 text-white" : "bg-green-200 text-gray-900"
                  } ${msg.lang === "ar-SA" ? "text-right" : "text-left"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex items-center p-2 mb- border-t w-full border-heading bg-green-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === "ar-SA" ? "اكتب رسالتك..." : "Type your message..."}
              className={`flex-grow p-2 rounded-full border border-heading focus:outline-none ${
                language === "ar-SA" ? "text-right" : "text-left"
              }`}
            />
            <button onClick={handleSendMessage} className="p-2 ml-2 bg-heading text-white rounded-full">
              <FaPaperPlane />
            </button>
            <button
              onClick={handleSpeechToText}
              className={`p-2 ml-2 rounded-full text-white ${isListening ? "bg-red-500" : "bg-blue-400"}`}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button
              onClick={() => setIsHistoryVisible(!isHistoryVisible)}
              className="p-2 ml-2 lg:hidden rounded-full bg-hoverbutton text-white text-xl"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
