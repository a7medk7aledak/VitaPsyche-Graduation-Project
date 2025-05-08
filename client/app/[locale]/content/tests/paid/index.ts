"use client";

import { useLocale } from "next-intl";
import { paidtests as dataEn } from "./data.en";
import { paidtests as dataAr } from "./data.ar";

export function usePaidTestData() {
  const locale = useLocale();
  const data = locale === "ar" ? dataAr : dataEn;
  return data;
}
