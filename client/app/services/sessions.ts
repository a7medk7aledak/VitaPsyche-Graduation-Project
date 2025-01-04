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
    const response = await axios.get("/api/sessions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Create new chat session
  createChatSession: async (token: string): Promise<ChatSession> => {
    const response = await axios.post(
      "/api/sessions",
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
