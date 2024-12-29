"use client";

import Heading from "@components/common/Heading";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateDates = (startDate: Date, days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const SessionBooking = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [sessionDuration, setSessionDuration] = useState(30);
  const [startDay, setStartDay] = useState(0);

  const allDates = generateDates(new Date(), 14); // Generate 14 days starting from today
  const visibleDates = allDates.slice(startDay, startDay + 4); // Show 4 days at a time
  const slots = [
    "12:00 AM",
    "7:00 AM",
    "1:30 PM",
    "3:30 PM",
    "5:25 PM",
    "7:00 PM",
    "8:30 PM",
    "9:35 PM",
  ];

  const reservedSlots = ["12:00 AM", "3:30 PM", "7:00 PM"];

  const handleSlotClick = (slot: string, date: Date) => {
    if (!reservedSlots.includes(slot)) {
      setSelectedDate(
        date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
      setSelectedSlot(slot);
    }
  };

  const handleNextDays = () => {
    if (startDay + 4 < allDates.length) {
      setStartDay(startDay + 4);
    }
  };

  const handlePreviousDays = () => {
    if (startDay - 4 >= 0) {
      setStartDay(startDay - 4);
    }
  };

  return (
    <div className=" lg:mx-auto lg:container px-6 mt-6 mb-28 font-sans ">
      <div className="-mb-10">
        <Heading variant="secondary">Session Booking</Heading>
      </div>

      <div className="flex flex-col justify-center md:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:w-1/4 flex flex-col space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <Image
              src={"/images/about-us/me.jpg"}
              alt="me.jpg"
              width={100}
              height={100}
              className="rounded-full mr-6"
            />{" "}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Wassim Ashraf
              </h2>
              <p className="text-sm text-gray-500">Psychiatrist</p>
              <p className="text-sm text-yellow-500 font-medium">
                4.88 (1172 Reviews)
              </p>
            </div>
          </div>

          {/* Session Duration Selection */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Select session duration:
            </h3>
            <div className="flex space-x-4">
              <button
                className={`px-6 py-2 rounded-md text-lg font-medium ${
                  sessionDuration === 60
                    ? "bg-[#00978c] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-[#bbe6e3]"
                }`}
                onClick={() => setSessionDuration(60)}
              >
                60 Min
              </button>
              <button
                className={`px-6 py-2 rounded-md text-lg font-medium ${
                  sessionDuration === 30
                    ? "bg-[#00978c] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-[#bbe6e3] "
                }`}
                onClick={() => setSessionDuration(30)}
              >
                30 Min
              </button>
            </div>
          </div>

          {/* Summary and Booking Button */}
          {selectedSlot && selectedDate && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-800">
                Slot is selected
              </p>
              <p className="text-md text-gray-700 mb-4">
                {selectedDate} - {selectedSlot} - {sessionDuration} Min
              </p>
              <Link href={"/doctorList/booking/checkout"}>
                <button className="w-full text-lg mx-auto px-6 py-3 btn shadow-md hover:shadow-lg btn-secondary rounded-md font-medium ">
                  Book Now 600 EGP
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="md:w-3/4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-4 py-2 bg-gray-200  rounded-md text-gray-700 hover:bg-gray-300 "
              onClick={handlePreviousDays}
              disabled={startDay === 0}
            >
              &lt;
            </button>
            <h3 className="text-lg font-semibold text-gray-800">
              {visibleDates[0].toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              -{" "}
              {visibleDates[visibleDates.length - 1].toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </h3>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
              onClick={handleNextDays}
              disabled={startDay + 4 >= allDates.length}
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visibleDates.map((date) => (
              <div
                key={date.toDateString()}
                className="border rounded-lg p-4 bg-gray-100"
              >
                <h4 className="text-md font-semibold text-center text-blue-800 mb-2">
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </h4>
                <div className="flex flex-col space-y-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      className={`w-full py-2 rounded-md text-sm font-medium ${
                        reservedSlots.includes(slot)
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : selectedSlot === slot &&
                            selectedDate ===
                              date.toLocaleDateString("en-US", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })
                          ? "bg-[#00978c] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-[#bbe6e3]"
                      }`}
                      onClick={() => handleSlotClick(slot, date)}
                      disabled={reservedSlots.includes(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            All times are <span className="font-medium">Africa/Cairo</span>{" "}
            <button className="underline text-blue-500 hover:text-blue-700">
              Change
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionBooking;
