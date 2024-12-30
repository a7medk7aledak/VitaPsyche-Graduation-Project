import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import doctorFormReducer from "./authDoctor/authDoctorSlice";
import cartReducer from "./cartSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctorForm: doctorFormReducer,
    cart: cartReducer,
  },
  //for the error of handling files in redux dueto unserializble of File object
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["doctorForm/setFormData"],
        ignoredPaths: [
          "doctorForm.cv",
          "doctorForm.certifications",
          "doctorForm.anotherQualification1",
          "doctorForm.anotherQualification2",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
