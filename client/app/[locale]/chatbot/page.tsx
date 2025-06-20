"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "@components/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "@/i18n/navigation";
import { RootState } from "@app/store/store";
import { logout } from "@app/store/authSlice";
import { messageService } from "@app/services/messages";
import { ChatSidebar } from "@components/chat/ChatSidebar";
import { ChatMessages } from "@components/chat/ChatMessages";
import { ChatInput } from "@components/chat/ChatInput";
import { Message } from "@myTypes/chat";

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

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
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { currentSession } = useSelector((state: RootState) => state.chat);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

        newRecognition.onerror = () => {
          setIsListening(false);
        };

        setRecognition(newRecognition);
      }
    }
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (!currentSession?.session_id || !token) {
        setMessages([]);
        return;
      }

      try {
        const oldMessages = await messageService.getSessionMessages(
          token,
          currentSession.session_id
        );

        const formattedMessages = oldMessages.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
          timestamp: msg.timestamp || new Date().toISOString(),
          lang: language,
          chat_session: currentSession.session_id,
        }));

        setMessages(formattedMessages);
        setTimeout(() => scrollToBottom(), 100);
      } catch (error) {
        console.error("Failed to load messages:", error);
        setMessages([]);
      }
    };

    loadMessages();
  }, [currentSession, token, language]);

  // Scroll handling
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auth check
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  const handleSpeechToText = () => {
    if (recognition) {
      recognition.lang = language;
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
        setIsListening(true);
      }
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleMessageSent = async (message: Message) => {
    if (!currentSession?.session_id || !token) {
      console.error("No active session or token available.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Please select or start a chat session to send messages.",
          timestamp: new Date().toISOString(),
          lang: language,
          chat_session: "error",
        },
      ]);
      setTimeout(() => scrollToBottom(), 100);
      return;
    }

    setMessages((prev) => [...prev, message]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => scrollToBottom(), 100);

    try {
      const botMessage = await messageService.sendMessage(token, {
        chat_session: currentSession.id,
        sender: message.sender,
        text: message.text,
      });

      if (botMessage) {
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("sendMessage returned no bot message.");
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "عذراً، يبدو أن هناك ضغطاً على الخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل.",
            timestamp: new Date().toISOString(),
            lang: language,
            chat_session: currentSession.id,
          },
        ]);
      }
    } catch (error: unknown) {
      console.error("Error sending message to chatbot:", error);
      let errorMessage =
        "عذراً، يبدو أن هناك ضغطاً على الخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل.";

      // Type guard to check if error has response property
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response: { status: number } };
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (axiosError.response.status === 503) {
          errorMessage =
            "عذراً، الخدمة غير متاحة حالياً. الرجاء المحاولة مرة أخرى بعد قليل.";
        } else if (axiosError.response.status === 504) {
          errorMessage =
            "عذراً، استغرق الرد وقتاً طويلاً. الرجاء المحاولة مرة أخرى بعد قليل.";
        }
      } else if (error && typeof error === "object" && "request" in error) {
        // The request was made but no response was received
        errorMessage =
          "عذراً، لا يمكن الاتصال بالخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorMessage,
          timestamp: new Date().toISOString(),
          lang: language,
          chat_session: currentSession.id,
        },
      ]);
      setTimeout(() => scrollToBottom(), 100);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <div className="flex flex-col h-screen bg-[#dce9e6]">
      <Navbar />

      {isHistoryVisible && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsHistoryVisible(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          isHistoryVisible={isHistoryVisible}
          setIsHistoryVisible={setIsHistoryVisible}
          language={language}
          handleLanguageChange={handleLanguageChange}
          user={user}
          onLogout={handleLogout}
          onProfileClick={() => router.push("/profile")}
          onSettingsClick={() => router.push("/settings")}
        />

        <div className="flex-1 flex flex-col lg:w-3/4 bg-white rounded-xl shadow-lg m-4 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-gray-700">
              {currentSession
                ? `Chat ${currentSession.displayId || 1}`
                : "Select a chat"}
            </h3>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            <ChatMessages
              messages={messages}
              language={language}
              isLoading={isLoading}
            />
            <div ref={messagesEndRef} className="h-4" />
          </div>

          <ChatInput
            input={input}
            setInput={setInput}
            isListening={isListening}
            handleSpeechToText={handleSpeechToText}
            language={language}
            setIsHistoryVisible={setIsHistoryVisible}
            onMessageSent={handleMessageSent}
          />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ChatBotPage), { ssr: false });
