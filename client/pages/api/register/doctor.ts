import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import axios from "axios";
import FormData from "form-data"; // Import FormData for creating multipart data
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: true,
      keepExtensions: true, // Keeps file extensions
    });

    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ error: "Error parsing form data" });
      }

      try {
        const formData = new FormData();

        // Loop through the fields and append them to FormData
        for (const [key, value] of Object.entries(fields)) {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
          } else {
            // Ensure the value is not null or undefined before appending
            if (value != null) {
              formData.append(key, value as string);
            }
          }
        }
        for (const [key, file] of Object.entries(files)) {
          const fileArray = Array.isArray(file) ? file : [file];
          fileArray.forEach((f) => {
            if (f && f.filepath) {
              formData.append(key, fs.createReadStream(f.filepath), {
                filename: f.originalFilename || "file",
                contentType: f.mimetype || "application/octet-stream",
              });
            }
          });
        }

        // Send FormData to the external API
        const response = await axios.post(
          "https://abdokh.pythonanywhere.com/api/register/doctor/",
          formData,
          { headers: formData.getHeaders() }
        );

        res.status(200).json(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status || 500;
          const data =
            error.response?.data?.message ||
            error.response?.data ||
            "Unexpected error";
          res.status(status).json({ error: data });
        } else {
          res.status(500).json({ error: "Unexpected error occurred" });
        }
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
