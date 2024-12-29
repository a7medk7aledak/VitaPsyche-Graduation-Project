import { TFormData } from "@app/types/FormDoctor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TFormData = {
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

const doctorFormSlice = createSlice({
  name: "doctorForm",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<TFormData>>) => {
      Object.assign(state, action.payload);
    },
    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.fluentLanguages = action.payload;
    },
  },
});

export const { setFormData, setLanguages } = doctorFormSlice.actions;
export default doctorFormSlice.reducer;
