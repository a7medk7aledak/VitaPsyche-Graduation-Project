import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

// تعريف interfaces للبيانات
interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
}

interface UserDetails {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  // أضف المزيد من الحقول حسب الحاجة
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
}

interface CompleteResponse extends LoginResponse {
  user: UserDetails;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompleteResponse | ApiErrorResponse>
) {
  if (req.method === "POST") {
    try {
      // 1. إرسال طلب تسجيل الدخول
      const loginResponse = await axios.post<LoginResponse>(
        "https://abdokh.pythonanywhere.com/api/login/",
        req.body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { access_token } = loginResponse.data;

      // 2. إرسال طلب للحصول على بيانات المستخدم
      const userResponse = await axios.get<UserDetails>(
        "https://abdokh.pythonanywhere.com/api/user/details/",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // دمج البيانات
      const result: CompleteResponse = {
        ...loginResponse.data,
        user: userResponse.data,
      };


      return res.status(200).json(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const status = axiosError.response?.status || 500;
        const errorMessage = axiosError.response?.data || {
          error: "An unexpected error occurred",
        };

        console.error("Error from external API:", errorMessage);
        return res.status(status).json(errorMessage);
      }

      // للأخطاء غير المتوقعة
      console.error("Unexpected error:", error);
      return res.status(500).json({
        error: "An unexpected error occurred",
      });
    }
  }

  // للطرق غير المسموح بها
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({
    error: `Method ${req.method} Not Allowed`,
  });
}
