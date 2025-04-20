import { AxiosError, isAxiosError } from "axios";

interface ApiErrorResponse {
  error?:
    | string
    | {
        username?: string[];
        email?: string[];
        [key: string]: unknown;
      };
  message?: string;
  detail?: string;
}

const axiosErrorHandler = function (error: unknown) {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const status = axiosError.response?.status || 500;
    const errorData = axiosError.response?.data;

    // Handle field-specific validation errors
    if (errorData?.error && typeof errorData.error === "object") {
      const errorObj = errorData.error;

      // Check for username error
      if (Array.isArray(errorObj.username) && errorObj.username.length > 0) {
        return {
          status,
          data: { error: errorObj.username[0] },
        };
      }

      // Check for email error
      if (Array.isArray(errorObj.email) && errorObj.email.length > 0) {
        return {
          status,
          data: { error: errorObj.email[0] },
        };
      }
    }

    // Handle other error responses
    return {
      status,
      data: errorData || { error: "An error occurred" },
    };
  }

  // Handle non-Axios errors
  return {
    status: 500,
    data: { error: "An unexpected error occurred" },
  };
};

export default axiosErrorHandler;
