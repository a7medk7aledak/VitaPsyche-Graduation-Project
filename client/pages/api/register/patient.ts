import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "https://abdokh.pythonanywhere.com/api/register/patient/",
        req.body,
        { headers: { "Content-Type": "application/json" } }
      );

      res.status(200).json(response.data);
    } catch (error: any) {
      console.error("Error from external API:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { error: "An unexpected error occurred" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
