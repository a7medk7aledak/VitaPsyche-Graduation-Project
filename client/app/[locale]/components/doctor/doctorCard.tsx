import React from "react";
import Image from "next/image";
import { FaStar, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "@/i18n/navigation";

import { useTranslations } from "next-intl";

const DoctorCard = ({ name, image }: { name: string; image: string }) => {
  const t = useTranslations("recommendations");

  return (
    <div className="max-w-sm mx-auto h-fit bg-white shadow-md rounded-lg border border-gray-200 p-6 hover:scale-105 duration-200">
      <div className="flex items-center gap-4">
        {/* Doctor Image */}
        <div className="relative w-24 h-24">
          <Image
            src={image}
            alt="Doctor"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          {/* Doctor Name and Specialty */}
          <h2 className="text-xl font-bold text-gray-900">Dr. {name}</h2>
          <p className="text-base text-gray-700 font-medium">
            {t("psychiatrist")}
          </p>
          {/* Rating */}
          <div className="flex items-center text-yellow-500 text-base">
            <FaStar className="me-1" />
            <span className="font-semibold">4.88</span>
            <span className="ms-1 text-gray-500 text-sm">({t("reviews")})</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex items-center space-x-2 space-x-reverse ">
        <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded font-medium">
          {t("topTherapist")}
        </span>
        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded font-medium">
          {t("sessions")}
        </span>
      </div>

      {/* Interests */}
      <div className="mt-4">
        <p className="text-base font-semibold text-gray-800">
          {t("interests")}
        </p>
        <div className="mt-2 flex gap-2">
          <span className="bg-teal-100 text-teal-700 px-3 py-1 text-sm rounded-full text-center font-medium">
            {t("moodDisorders")}
          </span>
          <span className="bg-teal-100 text-teal-700 px-3 py-1 text-sm rounded-full font-medium">
            {t("personalityDisorders")}
          </span>
        </div>
      </div>

      {/* Nearest Appointment */}
      <div className="mt-4 flex items-center text-base text-gray-800">
        <FaRegCalendarAlt className="text-gray-500 me-2" />
        <p>
          {t("nearestAppointment")}{" "}
          <span className="font-bold">{t("appointmentTime")}</span>
        </p>
      </div>

      {/* Pricing */}
      <div className="mt-4 flex items-center text-base text-gray-800">
        <FaRegClock className="text-gray-500 me-2" />
        <p>
          <span className="font-bold">{t("price60Min")}</span> / 60 Min &bull;
          <span className="ms-2 font-bold">{t("price30Min")}</span> / 30 Min
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-center items-center gap-x-6">
        <Link href={"/view-profile"}>
          <button className="text-lg font-medium text-subheading hover:underline">
            {t("viewProfile")}
          </button>
        </Link>
        <Link href={"/doctorList/booking"}>
          <button className="btn-secondary rounded-full text-white py-2 px-4 shadow-md hover:shadow-lg font-medium">
            {t("bookNow")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
