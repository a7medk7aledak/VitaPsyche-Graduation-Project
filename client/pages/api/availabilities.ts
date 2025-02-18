import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

interface Schedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
}

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Schedule | Schedule[] | ApiErrorResponse>
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const schedulesResponse = await axios.get<Schedule[]>(
          `${BASE_URL}/availabilities/`,
          {
            headers: { Authorization: authHeader },
          }
        );
        return res.status(200).json(schedulesResponse.data);
      }

      case "POST": {
        const scheduleResponse = await axios.post<Schedule>(
          `${BASE_URL}/availabilities/`,
          req.body,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(201).json(scheduleResponse.data);
      }

      case "PUT": {
        const { id } = req.query;

        if (!id)
          return res.status(400).json({ error: "Schedule ID is required" });

        const updatedScheduleResponse = await axios.put<Schedule>(
          `${BASE_URL}/availabilities/${id}/`,
          req.body,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(200).json(updatedScheduleResponse.data);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!id)
          return res.status(400).json({ error: "Schedule ID is required" });

        await axios.delete(`${BASE_URL}/availabilities/${id}/`, {
          headers: { Authorization: authHeader },
        });
        return res.status(204).end();
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const status = axiosError.response?.status || 500;
      const errorMessage = axiosError.response?.data || {
        error: "An error occurred",
      };

      console.error("API Error:", errorMessage);
      return res.status(status).json(errorMessage);
    }

    console.error("Unexpected Error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
