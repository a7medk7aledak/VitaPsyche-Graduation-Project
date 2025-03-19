import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

interface Service {
  id: number;
  name: string;
  description?: string;
  price: string;
  duration: string;
  is_active?: boolean;
  category: number;
  doctors?: string[];
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
}

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[] | ApiErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }


  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    const queryParams = new URLSearchParams(
      req.query as Record<string, string>
    ).toString();
    const servicesResponse = await axios.get<Service[]>(
      `${BASE_URL}/services/?${queryParams}`,
      {
        headers: { Authorization: authHeader },
      }
    );

    return res.status(200).json(servicesResponse.data);
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
