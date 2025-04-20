import { useState, useEffect } from "react";
import { SpeechRecognition } from "@myTypes/chat";

export const useSpeechRecognition = (
  language: string,
  setInput: (text: string) => void
) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      if (window.webkitSpeechRecognition) {
        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.continuous = false;
        newRecognition.interimResults = false;

        newRecognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        newRecognition.onerror = (event) => {
          console.error("Speech recognition error:", event);
          setIsListening(false);
        };

        setRecognition(newRecognition);
      }
    }
  }, [setInput]);

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

  return { isListening, handleSpeechToText };
};
