// store/slices/categoriesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "./act/actCategories";
import { isString } from "@app/types/types";
import { TLoading } from "@app/types/shared.types";

// Define Category type
interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface CategoriesState {
  categories: Category[];
  status: TLoading;
  error: string | null;
}

// Define initial state for categories
const initialState: CategoriesState = {
  categories: [],
  status: "idle",
  error: null,
};

// Create the categories slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succedded";
          state.categories = action.payload; // Store the categories
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default categoriesSlice.reducer;
