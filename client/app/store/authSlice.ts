// app/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorDetails {
  id: number;
  specialization: string;
  phone: string;
  country_of_residence: string;
  fluent_languages: string[];
  highest_degree: string;
  institution_name: string;
  graduation_year: number | null;
  years_of_experience: number;
  license_number: string;
  licensing_organization: string;
  working_in_clinic: string;
  clinic_name: string;
  availability_for_sessions: boolean;
}

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

  // for patient
  patient_details?: {
    id: number;
  };

  //for doctor
  doctor_details?: DoctorDetails;
}

interface AuthState {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  purchasedTests: string[];
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
  purchasedTests:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("purchasedTests") || "[]")
      : [],
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
    addPurchasedTest: (state, action: PayloadAction<string>) => {
      if (!state.purchasedTests.includes(action.payload)) {
        state.purchasedTests.push(action.payload);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "purchasedTests",
            JSON.stringify(state.purchasedTests)
          );
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.purchasedTests = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("purchasedTests");
      }
    },
  },
});

export const { setUser, setToken, addPurchasedTest, logout } =
  authSlice.actions;
export default authSlice.reducer;
