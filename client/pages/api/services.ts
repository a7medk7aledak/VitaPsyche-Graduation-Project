import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import formidable, { Fields, Files } from "formidable";
import fs from "fs";
import FormData from "form-data"; // Node.js FormData

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

export const config = {
  api: {
    bodyParser: false,
  },
};

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service | Service[] | ApiErrorResponse>
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const { doctorId, serviceId } = req.query;
        if (!doctorId && !serviceId) {
          return res
            .status(400)
            .json({ error: "Missing doctorId or serviceId" });
        }
        const servicesResponse = await axios.get<Service | Service[]>(
          serviceId
            ? `${BASE_URL}/services/${serviceId}` // Fetch specific service
            : `${BASE_URL}/services/?doctor_id=${doctorId}`, // Fetch all services for a doctor
          { headers: { Authorization: authHeader } }
        );
        return res.status(200).json(servicesResponse.data);
      }

      case "POST":
      case "PUT": {
        const { fields, files } = await parseForm(req);
        const formData = new FormData();

        // Add all fields to formData
        Object.entries(fields).forEach(([key, value]) => {
          if (value !== null) {
            formData.append(key, Array.isArray(value) ? value[0] : value);
          }
        });

        // Add image if it exists
        if (
          files.image &&
          Array.isArray(files.image) &&
          files.image.length > 0
        ) {
          const file = files.image[0];
          const fileStream = fs.createReadStream(file.filepath);
          formData.append("image", fileStream, {
            filename: file.originalFilename || "uploaded-file",
          });
        }

        const url =
          req.method === "POST"
            ? `${BASE_URL}/services/`
            : `${BASE_URL}/services/${req.query.id}/`;

        console.log(formData);
        const response = await axios({
          method: req.method,
          url,
          data: formData,
          headers: {
            Authorization: authHeader,
            ...formData.getHeaders(),
          },
        });

        return res
          .status(req.method === "POST" ? 201 : 200)
          .json(response.data);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!id)
          return res.status(400).json({ error: "Service ID is required" });

        await axios.delete(`${BASE_URL}/services/${id}/`, {
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
