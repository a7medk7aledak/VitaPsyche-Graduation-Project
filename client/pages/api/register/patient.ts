import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import formidable from "formidable";
import FormData from "form-data";

// Tell Next.js not to parse the body as JSON
export const config = {
  api: {
    bodyParser: false,
  },
};

// Define interfaces for API responses
interface ApiResponse {
  message?: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    // Add more fields as needed
  };
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
  // Add any other expected error fields
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiErrorResponse>
) {
  if (req.method === "POST") {
    try {
      // Parse the incoming form data
      const form = formidable();

      // Parse the form with proper typing
      const parseForm = async (): Promise<{ fields: unknown }> => {
        return new Promise((resolve, reject) => {
          form.parse(req, (err, fields) => {
            if (err) return reject(err);
            resolve({ fields });
          });
        });
      };

      const { fields } = await parseForm();

      // Create a new FormData object for the external API request
      const formData = new FormData();

      // Add all field values to the FormData
      if (fields && typeof fields === "object") {
        Object.entries(fields).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              formData.append(key, val);
            });
          } else if (value !== undefined) {
            formData.append(key, String(value));
          }
        });
      }

      // Send the request to the external API
      const response = await axios.post<ApiResponse>(
        "https://abdokh.pythonanywhere.com/api/register/patient/",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error(
          "Error from external API:",
          axiosError.response?.data || axiosError.message
        );
        res.status(axiosError.response?.status || 500).json(
          axiosError.response?.data || {
            error: "An unexpected error occurred",
          }
        );
      } else {
        // For unexpected errors
        console.error("Unexpected error:", error);
        res.status(500).json({
          error: "An unexpected error occurred",
        });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      error: `Method ${req.method} Not Allowed`,
    });
  }
}
