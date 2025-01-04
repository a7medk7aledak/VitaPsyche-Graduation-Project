import { motion } from "framer-motion";
import { Message } from "@app/types/chat";

interface ChatMessages {
  messages: Message[];
  language: string;
}

export const ChatMessages: React.FC<{
  messages: Message[];
  language: string;
}> = ({ messages, language }) => {
  return (
    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
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
            } ${language === "ar-SA" ? "text-right" : "text-left"}`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
