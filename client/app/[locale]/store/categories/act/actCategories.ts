import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

// Define the async thunk for form submission
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      // If no token is available, you might want to handle that case
      if (!token) {
        console.log("No token available, user might not be logged in");
        return [];
      }

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
