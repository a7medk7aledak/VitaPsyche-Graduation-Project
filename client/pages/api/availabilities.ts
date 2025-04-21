import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

interface Schedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const { doctorId } = req.query;
        const schedulesResponse = await axios.get<Schedule[]>(
          `${BASE_URL}/availabilities${doctorId ? `?doctor=${doctorId}` : "/"}`,

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
    const { status, data } = axiosErrorHandler(error);
    console.log("status code: " + status, data);
    return res.status(status).json(data);
  }
}
