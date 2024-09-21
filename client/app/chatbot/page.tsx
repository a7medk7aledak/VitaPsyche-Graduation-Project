"use client";
import Navbar from "@components/common/Navbar";
import { useState, useEffect } from "react";
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

// Type definition for SpeechRecognitionEvent
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

  // Initialize speech recognition when component mounts
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const newRecognition = new (window as typeof window & { webkitSpeechRecognition: new () => SpeechRecognition }).webkitSpeechRecognition();
      newRecognition.continuous = false;
      newRecognition.interimResults = false;

      newRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false); // Stop listening after speech is recognized
      };

      newRecognition.onerror = (event: Event) => {
        console.error("Speech recognition error:", (event as ErrorEvent).error);
        setIsListening(false);
      };

      setRecognition(newRecognition);
    }
  }, []);

  // Function to request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      const result = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      if (result.state === "denied") {
        alert("Microphone access is required for speech recognition.");
      }
    } catch (error) {
      console.error("Permission error: ", error);
    }
  };

  // Handle sending messages
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

  // Handle speech-to-text
  const handleSpeechToText = () => {
    if (recognition) {
      recognition.lang = language;

      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        requestMicrophonePermission();
        recognition.start();
        setIsListening(true);
      }
    }
  };

  // Handle language switch
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-[#dce9e6]"> {/* Use light green as the background */}
      <Navbar />
      {/* Mobile History Toggle Button */}
      <div className="lg:hidden p-4 bg-hoverbutton text-white flex justify-between items-center">
        <span>Chat History</span>
        <button onClick={() => setIsHistoryVisible(!isHistoryVisible)} className="text-white text-xl">
          <FaBars />
        </button>
      </div>

      {/* Main Chat Section */}
      <div className="flex flex-1">
        {/* Chat History Sidebar */}
        <div
          className={`fixed lg:relative z-40 top-0 left-0 h-full lg:w-1/6 bg-slate-800 rounded-md transition-transform transform ${
            isHistoryVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6 text-white">
            <h2 className="text-xl mb-4">History</h2>
            <div className="space-y-4">
              <button className="w-full text-left bg-heading  p-2 rounded-md">Chat 1</button>
              <button className="w-full text-left bg-heading p-2 rounded-md">Chat 2</button>
              <button className="w-full text-left bg-heading p-2 rounded-md">Chat 3</button>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col lg:w-3/4 bg-white rounded-md shadow-md">
          {/* Language Selector */}
          <div className="flex items-center p-4">
            <FaGlobe className="text-green-700 mr-2" /> {/* Green globe icon */}
            <select
              value={language}
              onChange={handleLanguageChange}
              className="p-2 border border-green-500 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="en-US">English (US)</option>
              <option value="ar-SA">Arabic</option>
              {/* Add more languages as needed */}
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
          <div className="flex items-center p-4 border-t border-heading bg-green-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === "ar-SA" ? "اكتب رسالتك..." : "Type your message..."}
              className={`flex-grow p-3 rounded-full border border-heading focus:outline-none ${
                language === "ar-SA" ? "text-right" : "text-left"
              }`}
            />
            <button onClick={handleSendMessage} className="p-3 ml-2 bg-heading text-white rounded-full">
              <FaPaperPlane />
            </button>
            <button
              onClick={handleSpeechToText}
              className={`p-3 ml-2 rounded-full text-white ${isListening ? "bg-red-500" : "bg-blue-400"}`}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
