import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TFormData } from "@myTypes/FormDoctor";
import axiosErrorHandler from "@app/utils/axiosErrorHandler";

// Define the async thunk for form submission
export const actAuthDoctorRegister = createAsyncThunk(
  "auth/actAuthDoctorRegister",
  async (formData: Partial<TFormData>, { rejectWithValue }) => {
    // Create a FormData object
    const formDataToSend = new FormData();
    // Add a default value for clinic_name if not provided to avoid the error that comes from database in backend
    if (!formData.clinic_name || formData.clinic_name.trim() === "") {
      formData.clinic_name = "Default Clinic Name";
    }

    // Append only valid fields
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof TFormData;
      const value = formData[typedKey];

      // Append only if value is not null, undefined, or an empty string
      if (value !== null && value !== undefined && value !== "") {
        formDataToSend.append(typedKey, value as string | Blob);
      }
    });

    try {
      // Send FormData to the Next.js API route
      const response = await axios.post(
        "/api/register/doctor",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
