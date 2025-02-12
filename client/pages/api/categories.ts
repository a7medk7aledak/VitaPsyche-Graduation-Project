import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler"; // Importing the error handler

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch categories from your backend or external service
    const response = await axios.get("https://your-backend.com/api/categories");

    // Send the categories as a JSON response
    res.status(200).json(response.data);
  } catch (error) {
    // Handle any errors using the axiosErrorHandler
    const errorMessage = axiosErrorHandler(error);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: errorMessage });
  }
}
