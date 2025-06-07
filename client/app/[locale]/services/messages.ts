import axios from "axios";
import { ChatSession, Message } from "@myTypes/chat";

export const sessionService = {
  getChatSessions: async (token: string): Promise<ChatSession[]> => {
    try {
      console.log("Fetching sessions with token:", token);
      const response = await axios.get("/api/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Sessions response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting sessions:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Status:", error.response?.status);
      }
      throw error;
    }
  },

  createChatSession: async (token: string): Promise<ChatSession> => {
    try {
      console.log("Creating new session with token:", token);
      const response = await axios.post(
        "/api/sessions",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("New session response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating session:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Status:", error.response?.status);
      }
      throw error;
    }
  },
};

export const messageService = {
  getSessionMessages: async (
    token: string,
    sessionId: string
  ): Promise<Message[]> => {
    try {
      console.log("Fetching messages for session:", sessionId);
      const response = await axios.get(`/api/messages?sessionId=${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Messages response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting messages:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Status:", error.response?.status);
      }
      throw error;
    }
  },

  sendMessage: async (
    token: string,
    message: {
      chat_session: number;
      sender: string;
      text: string;
    }
  ): Promise<Message> => {
    try {
      console.log("=== Frontend: Sending message to chatbot ===");
      console.log("Message details:", {
        text: message.text,
        sender: message.sender,
        chat_session: message.chat_session
      });

      console.log("FRONTEND: Sending message:", message.text, "Username:", message.sender);

      const response = await axios.post("/api/chatbot", {
        message: message.text,
        username: message.sender,
        chat_session: message.chat_session
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      });

      console.log("=== Frontend: Received response from chatbot ===");
      console.log("Response data:", response.data);

      return {
        sender: "bot",
        text: response.data.response,
        timestamp: new Date().toISOString(),
        chat_session: message.chat_session,
        lang: "ar-SA"
      };
    } catch (error) {
      console.error("=== Frontend: Error sending message ===");
      console.error("Error details:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Status:", error.response?.status);
      }
      throw error;
    }
  },
};
