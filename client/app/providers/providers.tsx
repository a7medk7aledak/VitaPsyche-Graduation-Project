"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import CategoriesFetcher from "./categoriesProvider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CategoriesFetcher />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      {children}
    </Provider>
  );
}
