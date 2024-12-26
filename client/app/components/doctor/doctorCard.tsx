import React from "react";
import Image from "next/image";
import { FaStar, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

const DoctorCard = () => {
  return (
    <div className="max-w-sm mx-auto h-fit bg-white shadow-md rounded-lg border border-gray-200 p-6 hover:scale-105 duration-200">
      <div className="flex items-center gap-4">
        {/* Doctor Image */}
        <div className="relative w-24 h-24">
          <Image
            src="/images/about-us/me.jpg"
            alt="Doctor"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          {/* Doctor Name and Specialty */}
          <h2 className="text-xl font-bold text-gray-900">Wassim Ashraf</h2>
          <p className="text-base text-gray-700 font-medium">Psychiatrist</p>
          {/* Rating */}
          <div className="flex items-center text-yellow-500 text-base">
            <FaStar className="mr-1" />
            <span className="font-semibold">4.88</span>
            <span className="ml-1 text-gray-500 text-sm">(1172 Reviews)</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex items-center space-x-2">
        <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded font-medium">
          Top Therapist
        </span>
        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded font-medium">
          1000+ Sessions
        </span>
      </div>

      {/* Interests */}
      <div className="mt-4">
        <p className="text-base font-semibold text-gray-800">Interests:</p>
        <div className="mt-2 flex gap-2">
          <span className="bg-teal-100 text-teal-700 px-3 py-1 text-sm rounded-full text-center font-medium">
            Mood disorders
          </span>
          <span className="bg-teal-100 text-teal-700 px-3 py-1 text-sm rounded-full font-medium">
            Personality disorders
          </span>
        </div>
      </div>

      {/* Nearest Appointment */}
      <div className="mt-4 flex items-center text-base text-gray-800">
        <FaRegCalendarAlt className="text-gray-500 mr-2" />
        <p>
          Nearest appointment:{" "}
          <span className="font-bold">Monday, Sep.30 at 12:00 AM</span>
        </p>
      </div>

      {/* Pricing */}
      <div className="mt-4 flex items-center text-base text-gray-800">
        <FaRegClock className="text-gray-500 mr-2" />
        <p>
          <span className="font-bold">950 EGP</span> / 60 Min
          <span className="ml-2 font-bold">600 EGP</span> / 30 Min
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-center items-center gap-x-6">
        <button className="text-lg font-medium text-subheading hover:underline">
          View Profile
        </button>
        <button className="btn-secondary rounded-full text-white py-2 px-4 shadow-md hover:shadow-lg font-medium">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
