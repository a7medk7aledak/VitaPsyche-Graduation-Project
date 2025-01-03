// app/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  email: string;
  role: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  nationality: string;
  fluent_languages: string;
  current_residence: string;
}

interface AuthState {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  isAuthenticated:
    typeof window !== "undefined"
      ? !!localStorage.getItem("access_token")
      : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", action.payload);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
