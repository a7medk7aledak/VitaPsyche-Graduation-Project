import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Message } from "@myTypes/chat";

interface ChatMessages {
  messages: Message[];
  language: string;
  isLoading?: boolean;
  isTyping?: boolean; // جديد: للتحكم في تأثير الكتابة
}

// مكون الكتابة المتدرجة
const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  onComplete?: () => void;
}> = ({ text, speed = 30, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayText}</span>;
};

// مكون التفكير
const ThinkingIndicator: React.FC<{ language: string }> = ({ language }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-start"
    >
      <div className={`max-w-md p-4 rounded-lg shadow-md bg-green-200 text-gray-900 ${
        language === "ar-SA" ? "text-right" : "text-left"
      }`}>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {language === "ar-SA" ? "يفكر..." : "Thinking..."}
          </span>
          <div className="flex space-x-1">
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
      </div>
    </motion.div>
  );
};

export const ChatMessages: React.FC<{
  messages: Message[];
  language: string;
  isLoading?: boolean;
  isTyping?: boolean;
  currentTypingMessage?: string; // الرسالة التي يتم كتابتها حالياً
}> = ({ 
  messages, 
  language, 
  isLoading = false, 
  isTyping = false,
  currentTypingMessage = ""
}) => {
  const [completedMessages, setCompletedMessages] = useState<Set<number>>(new Set());

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
            {/* إذا كانت الرسالة من البوت واللم تكتمل الكتابة بعد */}
            {msg.sender === "assistant" && !completedMessages.has(index) ? (
              <TypewriterText
                text={msg.text}
                speed={50}
                onComplete={() => {
                  setCompletedMessages(prev => new Set(Array.from(prev).concat(index)));
                }}
              />
            ) : (
              msg.text
            )}
          </div>
        </motion.div>
      ))}

      {/* مؤشر التفكير */}
      {isLoading && <ThinkingIndicator language={language} />}

      {/* الرسالة التي يتم كتابتها حالياً */}
      {isTyping && currentTypingMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className={`max-w-md p-4 rounded-lg shadow-md bg-green-200 text-gray-900 ${
            language === "ar-SA" ? "text-right" : "text-left"
          }`}>
            <TypewriterText text={currentTypingMessage} speed={50} />
          </div>
        </motion.div>
      )}
    </div>
  );
};