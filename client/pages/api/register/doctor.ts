// creating the endpoint to communicate with the external api to be as a mediator between frontend and the external backend

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import axios from "axios";
import FormData from "form-data"; // Import FormData for creating multipart data to handle data that contain files
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser because formidable will handle data itself
  },
};

export default async function handler(
  req: NextApiRequest, //receiving the request from frontend
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: true, // allow multiple files
      keepExtensions: true, // Keeps file extensions
    });

    form.parse(req, async (err, fields, files) => {
      // processing the data and dividing it into files and fields and provide error if error happen when handling
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

        // Loop through the files and append them to FormData
        for (const [key, file] of Object.entries(files)) {
          const fileArray = Array.isArray(file) ? file : [file]; // check if any file is an array of files like images and if not , put it inside an array alone to avoid error when handling it
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
          {
            headers: formData.getHeaders(), // the result of this is  'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'  the unique string used to separate the different parts of the form data
          }
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
