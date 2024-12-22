import { create } from "zustand";

import { TFormData } from "@app/types/FormDoctor";

type TDoctorFormStore = {
  formData: TFormData;
  setFormData: (data: Partial<TFormData>) => void;
  setLanguages: (languages: string[]) => void;
};

export const useDoctorFormStore = create<TDoctorFormStore>((set) => ({
  formData: {
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
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setLanguages: (languages) =>
    set((state) => ({
      formData: {
        ...state.formData,
        fluentLanguages: languages, // Set fluentLanguages directly from selected languages
      },
    })),
}));
