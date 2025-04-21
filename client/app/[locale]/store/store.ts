// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import doctorFormReducer from "./authDoctor/authDoctorSlice";
import cartReducer from "./cartSlice"; // تأكد من صحة مسار الاستيراد
import categoriesReducer from "./categories/categoriesSlice"; // تأكد من صحة مسار الاستيراد

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    doctorForm: doctorFormReducer,
    cart: cartReducer, // إضافة cart reducer
    categories: categoriesReducer, // Add the categories reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["doctorForm/setFormData"],
        ignoredPaths: [
          "doctorForm.formData.cv",
          "doctorForm.formData.certifications",
          "doctorForm.formData.another_qualification1",
          "doctorForm.formData.another_qualification2",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
