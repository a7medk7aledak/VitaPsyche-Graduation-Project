import axios from "axios";

export interface ChatSession {
  id: number;
  session_id: string;
  user: number;
  created_at: string;
}

export const sessionService = {
  // Get all chat sessions
  getChatSessions: async (token: string): Promise<ChatSession[]> => {
    const response = await axios.get("https://abdokh.pythonanywhere.com/chatbot_api/chat_sessions/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Create new chat session
  createChatSession: async (token: string): Promise<ChatSession> => {
    const response = await axios.post(
      "https://abdokh.pythonanywhere.com/chatbot_api/chat_sessions/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
