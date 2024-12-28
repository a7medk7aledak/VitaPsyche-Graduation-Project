"use client";
import Navbar from "@components/common/Navbar";
import { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperPlane,
  FaPlus,
  FaHistory,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { logout } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Declare the global SpeechRecognition for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

// Type definition for SpeechRecognition
type SpeechRecognition = {
  onend: () => void;
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
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      if (window.webkitSpeechRecognition) {
        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.continuous = false;
        newRecognition.interimResults = false;

        newRecognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        newRecognition.onerror = (event: Event) => {
          console.error(
            "Speech recognition error:",
            (event as ErrorEvent).error
          );
          setIsListening(false);
        };

        setRecognition(newRecognition);
      }
    }
  }, []);

  // Close sidebar and user menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isHistoryVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsHistoryVisible(false);
      }
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isHistoryVisible, isUserMenuOpen]);

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

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsUserMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#dce9e6] relative">
      <Navbar />

      {/* Blur Overlay */}
      {(isHistoryVisible || isUserMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => {
            setIsHistoryVisible(false);
            setIsUserMenuOpen(false);
          }}
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
          <div className="p-6 text-white h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">History</h2>
              <button
                onClick={() => setIsHistoryVisible(false)}
                className="lg:hidden text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                <FaHistory />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto">
              {chats.map((chat, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openChat(chat)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeChat === chat
                      ? "bg-[#46e4dc] text-gray-900"
                      : "bg-heading hover:bg-[#46e4dc] hover:text-gray-900"
                  }`}
                >
                  {chat}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addNewChat}
                className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              >
                <FaPlus className="mr-2" /> New Chat
              </motion.button>
            </div>

            {/* Language Selector and User Menu */}
            <div className="mt-auto space-y-3">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-3 border border-[#67e6c6] rounded-lg focus:ring-2 focus:ring-[#58ddbc] focus:outline-none bg-slate-800 text-white transition-colors hover:bg-slate-700"
              >
                <option value="en-US">English (US)</option>
                <option value="ar-SA">Arabic</option>
              </select>

              <div className="relative" ref={userMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-full p-3 text-white font-semibold border border-[#67e6c6] rounded-lg hover:bg-[#67e6c6] transition-colors flex items-center justify-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                    {user?.first_name?.[0] || "G"}
                  </div>
                  <span>
                    {user
                      ? `${user.first_name} ${user.last_name}`
                      : "Guest User"}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm text-gray-600">Signed in as</p>
                        <p className="font-medium text-gray-900">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleProfileClick}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2 text-gray-700"
                        >
                          <FaUser /> Profile
                        </button>
                        <button
                          onClick={() => router.push("/settings")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2 text-gray-700"
                        >
                          <FaCog /> Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 rounded-md flex items-center gap-2 text-red-600"
                        >
                          <FaSignOutAlt /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col lg:w-3/4 bg-white rounded-md shadow-md">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-700">
              {activeChat}
            </h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
              </motion.div>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex items-center p-4 border-t border-heading bg-green-100 space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={
                language === "ar-SA" ? "...اكتب رسالتك" : "Type your message..."
              }
              className={`flex-grow p-3 rounded-full border border-heading focus:outline-none focus:ring-2 focus:ring-green-500 ${
                language === "ar-SA" ? "text-right" : "text-left"
              }`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className={`p-3 rounded-full ${
                input.trim() ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"
              } text-white transition-colors`}
              disabled={!input.trim()}
            >
              <FaPaperPlane />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpeechToText}
              className={`p-3 rounded-full text-white transition-colors ${
                isListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsHistoryVisible(!isHistoryVisible)}
              className="lg:hidden p-3 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <RxHamburgerMenu />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
