import { TFormData } from "@app/types/FormDoctor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actAuthDoctorRegister } from "./act/actAuthDoctorRegister";
import { TLoading } from "@app/types/shared.types";
import { isString } from "@app/types/types";

type TInitialState = {
  formData: TFormData;
  status: TLoading;
  error: string | null;
  showModal: boolean;
};

const formData = {
  first_name: "",
  last_name: "",
  full_name_arabic: "",
  prefix: "",
  email: "",
  phone_number: "",
  username: "",
  password: "",
  password2: "",
  birth_date: "",
  gender: "",
  nationality: "",
  current_residence: "",
  fluent_languages: [],
  highestDegree: "",
  institutionName: "",
  graduationYear: null,
  category: "",
  specialization: "",
  years_of_experience: null,
  licenseNumber: "",
  licensingOrganization: "",
  workingInClinic: "",
  clinic_name: "",
  availability_for_sessions: true,
  cv: null,
  certifications: null,
  another_qualification1: null,
  another_qualification2: null,
};

// highestDegree: "",
//       category: "",
//   licenseNumber: "",
//   licensingOrganization: "",

// Define the initial state with proper typing
const initialState: TInitialState = {
  formData: formData,
  status: "idle",
  error: null as string | null,
  showModal: false,
};

const doctorFormSlice = createSlice({
  name: "doctorForm",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<TFormData>>) => {
      Object.assign(state.formData, action.payload);
    },
    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.formData.fluent_languages = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    //register of doctor
    builder.addCase(actAuthDoctorRegister.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(actAuthDoctorRegister.fulfilled, (state) => {
      state.status = "succedded";
      state.showModal = true;
    });
    builder.addCase(actAuthDoctorRegister.rejected, (state, action) => {
      state.status = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { setFormData, setLanguages, setShowModal } =
  doctorFormSlice.actions;
export default doctorFormSlice.reducer;
