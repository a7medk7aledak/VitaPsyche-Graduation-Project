"use client";

import Avatar3D from "@components/Avatar3D";
import React, { useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane } from "react-icons/fa";

// Define Speech Recognition related events
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

interface SpeechGrammarList {
  readonly length: number;
  addFromString(string: string, weight?: number): void;
  addFromURI(src: string, weight?: number): void;
  item(index: number): SpeechGrammar;
  [index: number]: SpeechGrammar;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  grammars: SpeechGrammarList;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((ev: Event) => void) | null;
  onaudiostart: ((ev: Event) => void) | null;
  onend: ((ev: Event) => void) | null;
  onerror: ((ev: SpeechRecognitionErrorEvent) => void) | null;
  onnomatch: ((ev: SpeechRecognitionEvent) => void) | null;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onsoundend: ((ev: Event) => void) | null;
  onsoundstart: ((ev: Event) => void) | null;
  onspeechend: ((ev: Event) => void) | null;
  onspeechstart: ((ev: Event) => void) | null;
  onstart: ((ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: unknown;
}

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
  const [agentMessage, setAgentMessage] = useState<string>(""); // حالة لتخزين رسالة الوكيل

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

  // Define SpeechRecognitionConstructor type
  type SpeechRecognitionConstructor = new () => SpeechRecognition;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        (
          window as typeof window & {
            SpeechRecognition?: SpeechRecognitionConstructor;
            webkitSpeechRecognition?: SpeechRecognitionConstructor;
          }
        ).SpeechRecognition ||
        (
          window as typeof window & {
            SpeechRecognition?: SpeechRecognitionConstructor;
            webkitSpeechRecognition?: SpeechRecognitionConstructor;
          }
        ).webkitSpeechRecognition;

      if (SpeechRecognitionAPI) {
        const speechRecognition = new SpeechRecognitionAPI();
        speechRecognition.lang = language;
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;

        speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
          if (event.results.length > 0) {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
          }
        };

        speechRecognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(speechRecognition);
      }
    }
  }, [language]);

  const handleSendMessage = async (text: string) => {
    if (text.trim() !== "") {
      const userMessage = { sender: "user", text, lang: language };
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
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "agent", text: data.response, lang: language },
          ]);
          setAgentMessage(data.response); // تحديث حالة agentMessage
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
      <Avatar3D message={agentMessage} /> {/* عرض الرسالة كفقاعة داخل 3D فقط */}
      {/* Message Input and Suggestions */}
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
            } p-3 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md`}
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
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <option value="ar-SA">Arabic</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VirtualSupportAgent;
