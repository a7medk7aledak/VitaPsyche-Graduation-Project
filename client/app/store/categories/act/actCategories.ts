import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk for form submission
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Token is:", token);

      // Make an API request to your Next.js API route
      const response = await axios.get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the categories data
    } catch (error) {
      return rejectWithValue(error); // If error, reject with error message
    }
  }
);
