"use client";

import Avatar3D from "@components/Avatar3D";
import React, { useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane } from "react-icons/fa";

// Speech Recognition Types
type SpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend?: () => void;
};

type SpeechRecognitionEvent = {
  results: { [key: number]: { [key: number]: { transcript: string } } };
};

// Window Type Extension

// Message Interface
interface Message {
  sender: "user" | "agent";
  text: string;
  lang: string;
}

const VirtualSupportAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [agentMessage, setAgentMessage] = useState<string>("");

  const suggestions: { [key: string]: string[] } = {
    "en-US": [
      "I need help.",
      "How can I manage stress?",
      "What are the best deep breathing techniques?",
      "I want tips to improve my mental health.",
      "What are some relaxation strategies?",
      "Can you help me deal with anxiety?",
    ],
    "ar-SA": [
      "أحتاج إلى مساعدة.",
      "كيف يمكنني إدارة التوتر؟",
      "ما هي أفضل تقنيات التنفس العميق؟",
      "أريد نصائح لتحسين صحتي النفسية.",
      "ما هي استراتيجيات الاسترخاء؟",
      "هل يمكنك مساعدتي في التعامل مع القلق؟",
    ],
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.lang = language;
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;

      speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        if (Object.keys(event.results).length > 0) {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
        }
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    }
  }, [language]);

  const handleSendMessage = async (text: string) => {
    if (text.trim() !== "") {
      const userMessage: Message = { sender: "user", text, lang: language };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setIsTyping(true);

      try {
        const response = await fetch("/api/lina", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text }),
        });

        const data = await response.json();

        setTimeout(() => {
          const agentResponse: Message = {
            sender: "agent",
            text: data.response,
            lang: language,
          };
          setMessages((prevMessages) => [...prevMessages, agentResponse]);
          setAgentMessage(data.response);
          setIsTyping(false);
        }, 2000);
      } catch (error) {
        console.error("Error communicating with the chatbot:", error);
        setIsTyping(false);
      }

      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
    setShowSuggestions(false);
  };

  const handleSpeechToText = () => {
    if (recognition) {
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

  return (
    <div className="flex flex-col h-screen relative bg-gradient-to-b from-blue-100 via-purple-100 to-indigo-200">
      {/* Messages Display */}

      <Avatar3D message={agentMessage} />

      {/* Input Section */}
      <div className="p-4 bg-white border-t border-gray-200 shadow-lg z-10">
        {showSuggestions && suggestions[language] && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {suggestions[language].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSpeechToText}
            className={`${
              isListening ? "bg-red-500" : "bg-blue-500"
            } p-3 text-white rounded-full hover:opacity-90 transition duration-300 shadow-md`}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(input);
                setShowSuggestions(false);
              }
            }}
            placeholder={
              language === "en-US" ? "Type your message..." : "اكتب رسالتك..."
            }
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir={language === "ar-SA" ? "rtl" : "ltr"}
          />
          <button
            onClick={() => {
              handleSendMessage(input);
              setShowSuggestions(false);
            }}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
          >
            <FaPaperPlane />
          </button>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border border-gray-300 rounded-lg shadow-md"
          >
            <option value="en-US">English</option>
            <option value="ar-SA">العربية</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VirtualSupportAgent;
