"use client";
import Navbar from "@components/common/Navbar";
import { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperPlane,
  FaBars,
} from "react-icons/fa";

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
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US"); // Default to English
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false); // Mobile Chat History visibility

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
      const userMessage = { sender: "user", text: input };
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
          { sender: "bot", text: data.response },
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
    <><div className="h-28">      <Navbar />
</div>
      <div className="flex h-[830px] flex-col lg:flex-row bg-gray-100">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden bg-gray-900 p-4 flex justify-between  items-center shadow-md">
          <h2 className="text-white text-xl">History</h2>
          <button
            onClick={() => setIsHistoryVisible(!isHistoryVisible)}
            className="text-white text-2xl"
          >
            <FaBars />
          </button>
        </div>

        {/* Chat History - always visible on desktop */}
        <div
          className={`fixed lg:relative z-50 top-0 left-0 h-full mt-4 bg-gray-900 p-4 lg:w-1/4 lg:block lg:flex-shrink-0 transition-transform duration-300 transform ${
            isHistoryVisible
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="space-y-2 mt-4">
            <button className="w-full text-left text-gray-200 bg-gray-600 p-2 rounded-md shadow-sm transition-colors duration-300 hover:bg-gray-500">
              Chat 1
            </button>
            <button className="w-full text-left text-gray-200 bg-gray-600 p-2 rounded-md shadow-sm transition-colors duration-300 hover:bg-gray-500">
              Chat 2
            </button>
            <button className="w-full text-left text-gray-200 bg-gray-600 p-2 rounded-md shadow-sm transition-colors duration-300 hover:bg-gray-500">
              Chat 3
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`flex-grow flex flex-col lg:mt-4 bg-white rounded-lg shadow-lg mx-auto md:w-2/3 lg:w-2/3 lg:max-w-4xl transition-transform duration-300 ${
            isHistoryVisible ? "lg:ml-64" : ""
          }`}
        >
          <h1 className="text-2xl font-semibold text-center text-heading mb-4 mt-4">
            Chatbot
          </h1>

          {/* Language Selection */}
          <div className="flex justify-end px-4">
            <label htmlFor="language" className="mr-2 text-gray-700">
              Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="en-US">English</option>
              <option value="ar-SA">Arabic</option>
            </select>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto mb-4 p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-4 rounded-3xl shadow-md transition-transform duration-300 transform ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white scale-105"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <strong>{msg.sender === "user" ? "You" : "MindMed"}:</strong>{" "}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input and Buttons */}
          <div className="flex items-center space-x-2 px-6 py-4 bg-gray-100 border-t border-gray-300 rounded-b-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-400 transition-colors duration-300 shadow-md"
            >
              <FaPaperPlane className="text-xl" />
            </button>
            <button
              onClick={handleSpeechToText}
              className={`p-3 rounded-full text-white shadow-md ${
                isListening
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-blue-500 hover:bg-blue-400"
              } transition-colors duration-300`}
            >
              {isListening ? (
                <FaMicrophoneSlash className="text-xl" />
              ) : (
                <FaMicrophone className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBotPage;
