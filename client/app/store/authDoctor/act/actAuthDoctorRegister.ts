import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TFormData } from "@app/types/FormDoctor";
import axiosErrorHandler from "@app/utils/axiosErrorHandler";

// Define the async thunk for form submission
export const actAuthDoctorRegister = createAsyncThunk(
  "auth/actAuthDoctorRegister",
  async (formData: TFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/register/doctor", formData);
      return response.data; // Return the response data to be handled in extraReducers
    } catch (error) {
      // Handle errors and reject with a meaningful value
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
