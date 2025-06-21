import React, { useState } from 'react';
import { Message } from '@myTypes/chat';
import { Mic, MicOff, Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  isListening: boolean;
  handleSpeechToText: () => void;
  language: string;
  setIsHistoryVisible: (visible: boolean) => void;
  onMessageSent: (message: Message) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  isListening,
  handleSpeechToText,
  language,
  setIsHistoryVisible,
  onMessageSent,
  isLoading,
  setIsLoading
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message: Message = {
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toISOString(),
      lang: language,
    };

    await onMessageSent(message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setIsHistoryVisible(true)}
          className="p-2 text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleSpeechToText}
          className={`p-2 rounded-full ${
            isListening
              ? 'bg-red-100 text-red-500'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          disabled={isLoading}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`p-2 rounded-full ${
            !input.trim() || isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}; 