import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

interface Certificate {
  id?: number;
  certificate_name: string;
  description: string | null;
  start_date: string;
  end_date: string;
}

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        // You can add filters like userId if needed
        const { userId } = req.query;
        const certificatesResponse = await axios.get<Certificate[]>(
          `${BASE_URL}/certificates${userId ? `?user=${userId}` : "/"}`,
          {
            headers: {
              Authorization: req.headers.authorization,
            },
          }
        );
        return res.status(200).json(certificatesResponse.data);
      }

      case "POST": {
        // Validate required fields
        const { certificate_name, start_date, end_date, description } =
          req.body;
        if (!certificate_name || !start_date || !end_date) {
          return res.status(400).json({
            error:
              "Missing required fields: certificate_name, start_date, and end_date are required",
          });
        }

        // Create payload with description explicitly set (can be null)
        const payload = {
          certificate_name,
          start_date,
          end_date,
          description: description || null, // Ensure description is included even if null
        };

        const certificateResponse = await axios.post<Certificate>(
          `${BASE_URL}/certificates/`,
          payload,
          {
            headers: {
              Authorization: req.headers.authorization,
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(201).json(certificateResponse.data);
      }

      case "PUT": {
        const { id } = req.query;
        if (!id)
          return res.status(400).json({ error: "Certificate ID is required" });

        // Validate required fields
        const { certificate_name, start_date, end_date, description } =
          req.body;
        if (!certificate_name || !start_date || !end_date) {
          return res.status(400).json({
            error:
              "Missing required fields: certificate_name, start_date, and end_date are required",
          });
        }

        // Create payload with description explicitly set (can be null)
        const payload = {
          certificate_name,
          start_date,
          end_date,
          description: description || null, // Ensure description is included even if null
        };

        const updatedCertificateResponse = await axios.put<Certificate>(
          `${BASE_URL}/certificates/${id}/`,
          payload,
          {
            headers: {
              Authorization: req.headers.authorization,
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(200).json(updatedCertificateResponse.data);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!id)
          return res.status(400).json({ error: "Certificate ID is required" });

        await axios.delete(`${BASE_URL}/certificates/${id}/`, {
          headers: { Authorization: req.headers.authorization },
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
