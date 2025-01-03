import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

interface Message {
  id: number;
  chat_session: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | Message[] | ApiErrorResponse>
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    switch (req.method) {
      case "GET":
        const { sessionId } = req.query;
        if (!sessionId) {
          return res.status(400).json({ error: "Session ID is required" });
        }

        const messagesResponse = await axios.get<Message[]>(
          `https://abdokh.pythonanywhere.com/chatbot_api/chat_sessions/${sessionId}/messages/`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        return res.status(200).json(messagesResponse.data);

      case "POST":
        const messageResponse = await axios.post<Message>(
          "https://abdokh.pythonanywhere.com/chatbot_api/messages/",
          req.body,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(201).json(messageResponse.data);

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({
          error: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const status = axiosError.response?.status || 500;
      const errorMessage = axiosError.response?.data || {
        error: "An unexpected error occurred",
      };

      console.error("Error from external API:", errorMessage);
      return res.status(status).json(errorMessage);
    }

    console.error("Unexpected error:", error);
    return res.status(500).json({
      error: "An unexpected error occurred",
    });
  }
}
