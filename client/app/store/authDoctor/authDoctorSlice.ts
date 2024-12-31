import { TFormData } from "@app/types/FormDoctor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actAuthDoctorRegister } from "./act/actAuthDoctorRegister";
import { TLoading } from "@app/types/shared.types";
import { isString } from "@app/types/types";

type TInitialState = {
  formData: TFormData;
  loading: TLoading;
  error: string | null;
};

const formData = {
  fullNameEnglish: "",
  fullNameArabic: "",
  prefix: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  countryOfResidence: "",
  fluentLanguages: [],
  highestDegree: "",
  institutionName: "",
  graduationYear: null,
  category: "",
  specialization: "",
  yearsOfExperience: null,
  licenseNumber: "",
  licensingOrganization: "",
  workingInClinic: "",
  clinicName: "",
  availabilityForSessions: "",
  cv: null,
  certifications: null,
  anotherQualification1: null,
  anotherQualification2: null,
};


// highestDegree: "",
//       category: "",
//   licenseNumber: "",
//   licensingOrganization: "",

// Define the initial state with proper typing
const initialState: TInitialState = {
  formData: formData,
  loading: "idle",
  error: null as string | null,
};

const doctorFormSlice = createSlice({
  name: "doctorForm",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<TFormData>>) => {
      Object.assign(state.formData, action.payload);
    },
    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.formData.fluentLanguages = action.payload;
    },
  },
  extraReducers: (builder) => {
    //register of doctor
    builder.addCase(actAuthDoctorRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthDoctorRegister.fulfilled, (state) => {
      state.loading = "succedded";
    });
    builder.addCase(actAuthDoctorRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { setFormData, setLanguages } = doctorFormSlice.actions;
export default doctorFormSlice.reducer;
