"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import CategoriesFetcher from "./categoriesProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CategoriesFetcher />
      {children}
    </Provider>
  );
}
