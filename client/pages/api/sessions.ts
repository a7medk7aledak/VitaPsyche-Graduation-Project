import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

interface ChatSession {
  id: number;
  session_id: string;
  user: number;
  created_at: string;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatSession | ChatSession[] | ApiErrorResponse>
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    switch (req.method) {
      case "GET":
        console.log("Getting sessions with auth:", authHeader);
        const sessionsResponse = await axios.get<ChatSession[]>(
          "https://abdokh.pythonanywhere.com/chatbot_api/chat_sessions/",
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        console.log("Sessions response:", sessionsResponse.data);
        return res.status(200).json(sessionsResponse.data);

      case "POST":
        console.log("Creating new session with auth:", authHeader);
        const newSessionResponse = await axios.post<ChatSession>(
          "https://abdokh.pythonanywhere.com/chatbot_api/chat_sessions/",
          {},
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("New session response:", newSessionResponse.data);
        return res.status(201).json(newSessionResponse.data);

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({
          error: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error("Full error:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error("Response data:", axiosError.response?.data);
      console.error("Status:", axiosError.response?.status);

      const status = axiosError.response?.status || 500;
      const errorMessage = axiosError.response?.data || {
        error: "An unexpected error occurred",
      };

      return res.status(status).json(errorMessage);
    }

    return res.status(500).json({
      error: "An unexpected error occurred",
    });
  }
}
