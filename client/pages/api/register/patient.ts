import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

// تعريف interface للـ response data
interface ApiResponse {
  // أضف الحقول المتوقعة من الـ API
  message?: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    // أضف المزيد من الحقول حسب الحاجة
  };
}

// تعريف interface للـ error response
interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
  // أضف أي حقول أخرى متوقعة في حالة الخطأ
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiErrorResponse>
) {
  if (req.method === "POST") {
    try {
      const response = await axios.post<ApiResponse>(
        "https://abdokh.pythonanywhere.com/api/register/patient/",
        req.body,
        {
          headers: { "Content-Type": "application/json" },
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
        // للأخطاء غير المتوقعة
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
