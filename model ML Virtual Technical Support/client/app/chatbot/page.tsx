"use client";
import React, { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperPlane,
  FaGlobe,
  FaHome,
} from "react-icons/fa";
import Image from "next/image";

const VirtualSupportAgent: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: string; text: string; lang: string }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const suggestions = {
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
    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition();
      speechRecognition.lang = language;
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        setInput(event.results[0][0].transcript);
      };
      setRecognition(speechRecognition);
    }
  }, [language]);

  const handleSendMessage = async (text: string) => {
    if (text.trim() !== "") {
      const userMessage = { sender: "user", text, lang: language };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setIsTyping(true);

      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text }),
        });

        const data = await response.json();

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "agent", text: data.response, lang: language },
          ]);
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
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="flex justify-end p-4 space-x-4">
        <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md">
          <FaGlobe className="text-blue-500" />
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border-none outline-none focus:ring-0 rounded-full bg-white text-gray-700"
          >
            <option value="en-US">English (US)</option>
            <option value="ar-SA">العربية</option>
          </select>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-500 p-3 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
        >
          <FaHome />
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/Capture.PNG"
            alt="Virtual Agent"
            className="h-64 w-auto object-contain"
            width={550}
            height={550}
          />
        </div>
        <div className="w-full max-w-4xl px-4 overflow-y-auto flex flex-col-reverse">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.sender === "agent" ? "self-start" : "self-end"
              } bg-white shadow-lg p-4 rounded-lg max-w-xs my-2 ${
                msg.sender === "agent" ? "ml-20" : "mr-20"
              } relative`}
              style={{
                animation: "fadeIn 0.5s ease",
                borderRadius: "20px",
                background: msg.sender === "agent" ? "#e0f7fa" : "#bbdefb",
                color: msg.sender === "agent" ? "#006064" : "#0d47a1",
              }}
            >
              <div
                className="absolute w-4 h-4 transform rotate-45"
                style={{
                  bottom: "-8px",
                  left: msg.sender === "agent" ? "20px" : "auto",
                  right: msg.sender === "agent" ? "auto" : "20px",
                  background: msg.sender === "agent" ? "#e0f7fa" : "#bbdefb",
                  boxShadow: "2px 2px 2px rgba(0,0,0,0.1)",
                  clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
                }}
              />
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="self-start bg-white shadow-lg p-4 rounded-lg max-w-xs my-2 ml-20 relative">
              <div
                className="absolute w-4 h-4 transform rotate-45"
                style={{
                  bottom: "-8px",
                  left: "20px",
                  background: "#e0f7fa",
                  boxShadow: "2px 2px 2px rgba(0,0,0,0.1)",
                  clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
                }}
              />
              <div className="animate-pulse text-blue-500">...</div>
            </div>
          )}
        </div>
      </div>

      {showSuggestions && (
        <div className="flex flex-wrap justify-center space-x-2 p-4">
          {suggestions[language].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 m-2"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center p-4 border-t border-gray-200 bg-white w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
          placeholder={
            language === "en-US" ? "Type your message..." : "اكتب رسالتك..."
          }
          className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
        />
        <button
          onClick={() => handleSendMessage(input)}
          className="p-3 ml-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          <FaPaperPlane />
        </button>
        <button
          onClick={handleSpeechToText}
          className={`p-3 ml-2 text-white rounded-full ${
            isListening ? "bg-red-500" : "bg-blue-500"
          } hover:bg-blue-600 transition duration-300`}
        >
          {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
      </div>
    </div>
  );
};

export default VirtualSupportAgent;
