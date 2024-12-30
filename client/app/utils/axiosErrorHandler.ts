import { isAxiosError } from "axios";

const axiosErrorHandler = function (error: unknown) {
  console.log(error);
  if (isAxiosError(error)) {
    console.log(error);
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  } else {
    return "An unexpected error";
  }
};

export default axiosErrorHandler;
