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
      console.log("Sending message:", message);
      const response = await axios.post("/api/messages", message, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Message sent response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Status:", error.response?.status);
      }
      throw error;
    }
  },
};
