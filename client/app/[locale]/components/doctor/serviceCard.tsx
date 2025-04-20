import { useCategoryLookup } from "@utils/categoryLookup";
import { formatDuration, getInitial } from "@utils/doctorUtils";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { FaClock, FaMoneyBillTransfer } from "react-icons/fa6";

interface ServiceCardProps {
  id: number;
  doctor: number;
  name: string;
  doctor_name?: string;
  description: string;
  price: string;
  duration: string;
  category: number;
  is_active: boolean;
  image?: string;
}

const ServiceCard = memo(
  ({
    id,
    name,
    doctor,
    doctor_name,
    description,
    price,
    duration,
    category,
    is_active,
    image,
  }: ServiceCardProps) => {
    const getCategory = useCategoryLookup();
    const doctorInitial = getInitial(doctor_name);

    const categoryName = getCategory(category);
    const formattedDuration = formatDuration(duration);

    // Define color variations
    const avatarColors = [
      { bg: "bg-red-500", text: "text-white" },
      { bg: "bg-blue-500", text: "text-white" },
      { bg: "bg-green-500", text: "text-white" },
      { bg: "bg-yellow-400", text: "text-black" },
      { bg: "bg-purple-500", text: "text-white" },
      { bg: "bg-pink-500", text: "text-white" },
      { bg: "bg-teal-500", text: "text-white" },
      { bg: "bg-indigo-500", text: "text-white" },
      { bg: "bg-orange-500", text: "text-white" },
    ];

    const categoryColors = [
      "bg-blue-200 text-blue-800",
      "bg-purple-200 text-purple-800",
      "bg-yellow-200 text-yellow-800",
      "bg-pink-200 text-pink-800",
      "bg-indigo-200 text-indigo-800",
    ];

    // Random selection
    const avatarStyle =
      avatarColors[Math.floor(Math.random() * avatarColors.length)];

    // Ensure category has a fallback to avoid errors
    const categoryStyle =
      category && category < categoryColors.length
        ? categoryColors[category % categoryColors.length]
        : "bg-gray-200 text-gray-800";

    return (
      <div className="relative w-[400px] max-h-[350px] max-w-full mx-auto shadow-lg rounded-xl border border-gray-200 p-6 flex flex-col gap-4 transition-transform hover:scale-105 duration-300 bg-white">
        {/* Status Badge in Top-Right Corner */}
        <span
          className={`absolute top-2 right-2 text-sm px-3 py-1 rounded-full font-medium ${
            is_active
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {is_active ? "Active" : "Inactive"}
        </span>

        {/* Header: Avatar & Doctor Info */}
        <div className="flex items-center gap-4 min-w-0">
          {image ? (
            <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden rounded-full border">
              <Image
                src={image}
                alt={doctor_name || "Doctor"}
                width={64}
                height={64}
                quality={100}
                priority
                unoptimized
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div
              className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-2xl font-bold shadow-md ${avatarStyle.bg} ${avatarStyle.text}`}
            >
              {doctorInitial}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2
              title={name}
              className="text-xl font-semibold text-gray-900 truncate capitalize"
            >
              {name || "Unknown Service"}
            </h2>
            <p className="text-lg text-gray-700 capitalize truncate">
              {doctor_name ? `Dr. ${doctor_name}` : "Unknown Doctor"}
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-wrap gap-3">
          <span
            className={`text-sm px-4 py-1 rounded-full font-medium ${categoryStyle}`}
          >
            {categoryName || "Uncategorized"}
          </span>
        </div>

        {/* Description */}
        <p
          title={description}
          className="text-base text-gray-800 line-clamp-2 overflow-hidden break-words min-h-[48px]"
        >
          {description || "No description available."}
        </p>

        {/* Pricing & Duration */}
        <div className="flex justify-between items-center text-lg font-medium text-gray-900">
          <div className="flex items-center gap-2">
            <FaMoneyBillTransfer className="text-green-600 h-6 w-6" />
            <span>{price ? `${price} EGP` : "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-orange-500 h-6 w-6" />
            <span>{formattedDuration || "N/A"} mins</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center gap-x-6">
          <Link href={`/view-profile?serviceId=${id}&doctorId=${doctor}`}>
            <button className="text-lg font-medium text-subheading hover:underline">
              View Profile
            </button>
          </Link>
          <Link href={`/doctorList/booking?serviceId=${id}&doctorId=${doctor}`}>
            <button className="btn-secondary rounded-full text-white py-2 px-4 shadow-md hover:shadow-lg font-medium">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
