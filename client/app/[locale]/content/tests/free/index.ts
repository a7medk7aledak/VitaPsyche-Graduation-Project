"use client";

import { useLocale } from "next-intl";
import { tests as dataEn } from "./data.en";
import { tests as dataAr } from "./data.ar";

export function useFreeTestData() {
  const locale = useLocale();
  const data = locale === "ar" ? dataAr : dataEn;
  return data;
}
