import { isAxiosError } from "axios";

const axiosErrorHandler = function (error: unknown) {
  console.log(error);
  if (isAxiosError(error)) {
    // Check if error.response exists and has the specific structure you're expecting
    if (error.response?.data?.error?.username) {
      // If the username error exists, return the first message
      return error.response.data.error.username[0];
    }
    if (error.response?.data?.error?.email) {
      // If the username error exists, return the first message
      return error.response.data.error.email[0];
    }
    // If the error exists but not the username error, return a generic error message
    return (
      error.response?.data?.message || error.response?.data || error.message
    );
  } else {
    return "An unexpected error occurred";
  }
};


export default axiosErrorHandler;