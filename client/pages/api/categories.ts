import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler"; // Importing the error handler

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authentication credentials were not provided." });
    }

    // Fetch categories from your backend or external service
    const response = await axios.get(
      "https://abdokh.pythonanywhere.com/api/categories/",
      {
        headers: {
          Authorization: authHeader, // Use the token from the request
        },
      }
    );

    // Send the categories as a JSON response
    res.status(200).json(response.data);
  } catch (error) {
    console.log("the error is ", axiosErrorHandler(error));
    // Handle any errors using the axiosErrorHandler
    const errorMessage = axiosErrorHandler(error);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: errorMessage });
  }
}
