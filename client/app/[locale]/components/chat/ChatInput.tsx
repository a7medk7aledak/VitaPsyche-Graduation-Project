import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaPaperPlane, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { RootState } from "@app/store/store";
import { Message } from "@myTypes/chat";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  isListening: boolean;
  handleSpeechToText: () => void;
  language: string;
  setIsHistoryVisible: (visible: boolean) => void;
  onMessageSent: (message: Message) => void;
  setIsLoading: (loading: boolean) => void; // Add this
}
export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  isListening,
  handleSpeechToText,
  language,
  setIsHistoryVisible,
  onMessageSent,
}) => {
  const [isSending, setIsSending] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { currentSession } = useSelector((state: RootState) => state.chat);

  const saveBotMessageToAPI = async (message: Message) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat_session: message.chat_session,
          sender: message.sender,
          text: message.text,
          timestamp: message.timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save bot message: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving bot message to API:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !currentSession?.id || !token) return;

    setIsSending(true);

    try {
      // Send user message
      const userMessage: Message = {
        sender: "user",
        text: input.trim(),
        timestamp: new Date().toISOString(),
        lang: language,
        chat_session: currentSession.id,
      };
      onMessageSent(userMessage);
      await saveBotMessageToAPI(userMessage);

      // Get chatbot response
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Create bot message
      const botMessage: Message = {
        sender: "bot",
        text: data.response,
        timestamp: new Date().toISOString(),
        lang: language,
        chat_session: currentSession.id,
      };

      // First show the message to the user
      onMessageSent(botMessage);

      // Then save it to the API

      await saveBotMessageToAPI(botMessage);

      setInput("");
    } catch (error) {
      console.error("Error in message handling:", error);
      // Add error handling UI here
    } finally {
      setIsSending(false);
    }
  };

  return (
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
        dir={language === "ar-SA" ? "rtl" : "ltr"}
      />

      <motion.button
        whileHover={{ scale: input.trim() ? 1.05 : 1 }}
        whileTap={{ scale: input.trim() ? 0.95 : 1 }}
        onClick={handleSendMessage}
        disabled={!input.trim() || isSending}
        className={`p-3 rounded-full ${
          input.trim() && !isSending
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-300"
        } text-white transition-colors`}
      >
        {isSending ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaPaperPlane />
        )}
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
        onClick={() => setIsHistoryVisible(true)}
        className="lg:hidden p-3 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <RxHamburgerMenu />
      </motion.button>
    </div>
  );
};
