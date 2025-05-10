"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface IAppointmentData {
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: string;
  time: string;
  endTime: string;
  duration: string;
  doctorName: string;
  categoryName: string;
  serviceName: string;
  price: string;
}

interface IAppointmentDetailsProps {
  appointmentData: IAppointmentData | null;
}

export function AppointmentDetails({
  appointmentData,
}: IAppointmentDetailsProps) {
  const [coupon, setCoupon] = useState("");
  const t = useTranslations("appointmentCheckout.appointmentDetails");

  // Parse and format the date properly
  const formatDateString = (dateStr: string) => {
    if (!dateStr) return "";

    // Handle date string in format "Thu, Feb 27"
    try {
      // Add current year if missing
      const currentYear = new Date().getFullYear();
      const fullDateStr = dateStr.includes(currentYear.toString())
        ? dateStr
        : `${dateStr}, ${currentYear}`;

      const date = new Date(fullDateStr);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        // If parsing fails, just return the original string
        return dateStr;
      }

      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      // If any errors occur during parsing, return the original string
      return dateStr;
    }
  };

  // Default values or use appointmentData if available
  const doctorName = appointmentData?.doctorName || "WASSIM ASHRAF";
  const categoryName = appointmentData?.categoryName || "PSYCHOLOGIST";
  const formattedDate = formatDateString(appointmentData?.date || "");
  const timeDisplay =
    appointmentData?.time && appointmentData?.endTime
      ? `${appointmentData.time} - ${appointmentData.endTime}`
      : "12:00 AM - 12:30 AM";
  const price = appointmentData?.price || "1520";

  // Calculate fees
  const sessionFees = Number(price);
  const totalAmount = sessionFees;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md ">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/images/about-us/me.jpg"
          alt="Doctor profile"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h2 className="font-bold text-[#1a1a3f]">
            {t("doctorPrefix")}
            {doctorName} | <span className="text-blue-600">{categoryName}</span>
          </h2>
        </div>
      </div>
      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/payment-methods/date.png"
            alt="Calendar"
            width={24}
            height={24}
          />
          <span className="text-[#1a1a3f] font-medium">
            {formattedDate} ({timeDisplay})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/images/payment-methods/money.png"
            alt="Price"
            width={24}
            height={24}
          />
          <span className="text-[#1a1a3f] font-medium">
            {sessionFees} {t("currency")}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder={t("couponPlaceholder")}
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00978c]"
        />
        <button
          className="px-6 py-3 bg-[#00978c] block ms-auto text-white rounded-xl font-medium transition-colors disabled:opacity-40"
          disabled={!coupon}
        >
          {t("applyButton")}
        </button>
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-[#1a1a3f]">
          <span>{t("sessionFees")}</span>
          <span className="font-medium">
            {sessionFees} {t("currency")}
          </span>
        </div>

        <div className="flex justify-between text-[#1a1a3f] font-bold pt-2 border-t">
          <span>{t("totalAmount")}</span>
          <span>
            {totalAmount} {t("currency")}
          </span>
        </div>
      </div>
    </div>
  );
}
