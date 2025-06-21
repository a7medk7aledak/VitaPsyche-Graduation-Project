export type SpeechRecognition = {
  onend: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
};

export type SpeechRecognitionEvent = {
  results: { [key: number]: { [key: number]: { transcript: string } } };
};

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export interface User {
  id: string | number;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export interface ChatSession {
  id: number;
  session_id: string;
  displayId?: number; // Add this property as optional  user: number;
  created_at: string;
}

export interface Message {
  id?: number;
  sender: string;
  text: string;
  text_en?: string;
  timestamp: string;
  lang?: string;
  chat_session: string | number; // Update this to accept both string and number
  username?: string;
}
