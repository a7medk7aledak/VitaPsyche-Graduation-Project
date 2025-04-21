import { motion } from "framer-motion";
import { Message } from "@myTypes/chat";

interface ChatMessages {
  messages: Message[];
  language: string;
  isLoading?: boolean; // Add this prop
}

export const ChatMessages: React.FC<{
  messages: Message[];
  language: string;
  isLoading?: boolean;
}> = ({ messages, language, isLoading = false }) => {
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

      {/* Thinking Animation */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="max-w-md p-4 rounded-lg shadow-md bg-green-200 text-gray-900">
            <div className="flex space-x-2">
              <motion.div
                className="w-2 h-2 bg-gray-600 rounded-full"
                animate={{
                  y: ["0%", "-50%", "0%"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              />
              <motion.div
                className="w-2 h-2 bg-gray-600 rounded-full"
                animate={{
                  y: ["0%", "-50%", "0%"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
              <motion.div
                className="w-2 h-2 bg-gray-600 rounded-full"
                animate={{
                  y: ["0%", "-50%", "0%"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
