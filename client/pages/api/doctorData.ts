// pages/api/doctor/[doctorId].ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check for authentication header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authentication credentials were not provided." });
    }

    // Get the doctor ID from the query parameters
    const { doctorId } = req.query;
    // Fetch doctor data from your backend
    const response = await axios.get(`${BASE_URL}/doctor/${doctorId}/`, {
      headers: {
        Authorization: authHeader, // Use the token from the request
      },
    });

    // Send the doctor data as a JSON response
    res.status(200).json(response.data);
  } catch (error) {
    const { status, data } = axiosErrorHandler(error);
    console.log("status code: " + status, data);
    return res.status(status).json(data);
  }
}
