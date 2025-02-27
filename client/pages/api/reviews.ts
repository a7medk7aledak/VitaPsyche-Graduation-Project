import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authentication credentials were not provided." });
  }

  try {
    switch (req.method) {
      case "POST": {
        // Submit a new review
        const response = await axios.post(`${BASE_URL}/reviews/`, req.body, {
          headers: { Authorization: authHeader },
        });

        return res.status(201).json(response.data);
      }

      case "GET": {
        // Fetch reviews (optionally by doctor ID)
        const { doctorId } = req.query;
        const url = doctorId
          ? `${BASE_URL}/reviews/?doctor_id=${doctorId}`
          : `${BASE_URL}/reviews/`;

        const response = await axios.get(url, {
          headers: { Authorization: authHeader },
        });

        return res.status(200).json(response.data);
      }

      default:
        res.setHeader("Allow", ["POST", "GET"]);
        return res
          .status(405)
          .json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    const { status, data } = axiosErrorHandler(error);
    console.log("status code: " + status, data);
    return res.status(status).json(data);
  }
}
