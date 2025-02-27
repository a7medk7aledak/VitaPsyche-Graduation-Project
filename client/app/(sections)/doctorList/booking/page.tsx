"use client";

import withAuth from "@components/auth/WithAuth";
import Heading from "@components/common/Heading";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import useAxios from "@hooks/useAxios";
import { useCheckDoctorPermissions } from "@hooks/useCheckDoctorPermissions";
import { RootState } from "@store/store";
import { useCategoryLookup } from "@utils/categoryLookup";
import { formatDuration, getDoctorInitial } from "@utils/doctorUtils";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface IAvailability {
  id: number;
  doctor: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  max_patients_per_slot: number;
  notes?: string;
}

interface IService {
  id: number;
  name: string;
  description?: string;
  price: string;
  duration: string;
  doctor: number;
  doctor_name: string;
  image?: string;
  category: number;
  is_active: boolean;
}

const defaultService: IService = {
  id: 0,
  name: "",
  description: "",
  price: "0",
  duration: "",
  doctor: 0,
  doctor_name: "",
  image: "",
  category: 0,
  is_active: true,
};

interface ITimeSlot {
  time: string;
  endTime: string;
  isReserved: boolean;
}

interface IAppointment {
  id: number;
  created_at: string;
  updated_at: string;
  date_time: string;
  status: string;
  cost: number | null;
  notes: string;
  appointment_address: string;
  is_follow_up: boolean;
  is_confirmed: boolean;
  patient: number;
  doctor: number;
  services: number[];
}

const generateDates = (startDate: Date, days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Helper function to convert time string to minutes from midnight
const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes from midnight to formatted time string
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
};

// Function to check if a slot is reserved based on appointments
// Function to check if a slot is reserved based on appointments
const isSlotReserved = (
  date: Date,
  slotStartTime: string,
  appointments: IAppointment[]
): boolean => {
  // Format the date to YYYY-MM-DD
  const formattedDate = date.toISOString().split("T")[0];

  // Convert the slot time to 24-hour format for comparison
  const [time, period] = slotStartTime.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  // Adjust hour for PM
  if (period === "PM" && hour !== 12) {
    hour += 12;
  }
  // Adjust for AM 12 (midnight)
  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  // Create a datetime string in the format expected by Date constructor
  const slotTimeString = `${formattedDate}T${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
  const slotTime = new Date(slotTimeString);

  // Check if any appointment matches this date and time
  return appointments.some((appointment) => {
    // Create a new date from the appointment time and subtract 2 hours
    const appointmentTime = new Date(appointment.date_time);
    appointmentTime.setHours(appointmentTime.getHours() - 2);

    // Compare year, month, day, hour, and minute
    return (
      appointmentTime.getFullYear() === slotTime.getFullYear() &&
      appointmentTime.getMonth() === slotTime.getMonth() &&
      appointmentTime.getDate() === slotTime.getDate() &&
      appointmentTime.getHours() === slotTime.getHours() &&
      appointmentTime.getMinutes() === slotTime.getMinutes()
    );
  });
};

// Generate time slots from availability and duration
const generateTimeSlots = (
  availabilities: IAvailability[],
  date: Date,
  durationMinutes: number,
  appointments: IAppointment[]
): { slots: ITimeSlot[]; notes?: string } => {
  // Convert day of week number to name
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Find availability for this day
  const dayAvailability = availabilities.find(
    (a) => a.day_of_week.toLowerCase() === dayOfWeek.toLowerCase()
  );

  if (!dayAvailability) return { slots: [] };

  // Convert times to minutes from midnight for easier calculation
  const startMinutes = timeToMinutes(dayAvailability.start_time);
  const endMinutes = timeToMinutes(dayAvailability.end_time);

  // Calculate total session time including 10 minute break
  const sessionTimeWithBreak = durationMinutes + 10;

  const slots: ITimeSlot[] = [];
  let currentMinute = startMinutes;

  // Generate slots until we reach the end time
  while (currentMinute + durationMinutes <= endMinutes) {
    const startTimeStr = minutesToTime(currentMinute);
    const endTimeStr = minutesToTime(currentMinute + durationMinutes);

    // Check if this slot is reserved based on appointments
    const reserved = isSlotReserved(date, startTimeStr, appointments);

    slots.push({
      time: startTimeStr,
      endTime: endTimeStr,
      isReserved: reserved,
    });

    // Move to next slot with break
    currentMinute += sessionTimeWithBreak;
  }

  return {
    slots,
    notes: dayAvailability.notes,
  };
};

const SessionBooking = () => {
  const router = useRouter();
  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const getCategory = useCategoryLookup();

  const [service, setService] = useState<IService>(defaultService);
  const [availabilities, setAvailabilities] = useState<IAvailability[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);
  const [selectedDayNotes, setSelectedDayNotes] = useState<string | null>(null);
  const [startDay, setStartDay] = useState(0);

  // Get doctor ID and service ID from URL
  const serviceId = searchParams?.get("serviceId") ?? null;
  const doctorId = searchParams?.get("doctorId") ?? null;
  const doctorInitial = getDoctorInitial(service.doctor_name);
  const categoryName = getCategory(service.category);
  const { canBook } = useCheckDoctorPermissions(doctorId);

  const patientId = useSelector(
    (state: RootState) => state.auth.user?.patient_details?.id
  );

  const allDates = generateDates(new Date(), 14); // Generate 14 days starting from today
  const visibleDates = allDates.slice(startDay, startDay + 7); // Show 7 days at a time

  useEffect(() => {
    if (!doctorId) {
      setError("Doctor ID is required");
      router.push("/doctorList");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch doctor availabilities, appointments, and service details
        const [availabilityResponse, serviceResponse, appointmentsResponse] =
          await Promise.all([
            axiosInstance.get(`/api/availabilities?doctorId=${doctorId}`),
            serviceId
              ? axiosInstance.get(`/api/services?serviceId=${serviceId}`)
              : Promise.resolve({ data: defaultService }),
            axiosInstance.get(`/api/appointments?doctorId=${doctorId}`),
          ]);

        setAvailabilities(availabilityResponse.data);

        if (serviceResponse.data) {
          setService(serviceResponse.data);
        }

        // Set appointments data
        setAppointments(appointmentsResponse.data);

        console.log("availabilities", availabilityResponse.data);
        console.log("service", serviceResponse.data);
        console.log("appointments", appointmentsResponse.data);
      } catch (err) {
        setError("Failed to load doctor information. Please try again later.");
        if (isAxiosError(err)) {
          // The server's processed error is now in err.response
          const { status, data } = err.response || {
            status: 500,
            data: { message: "Unknown error occurred" },
          };
          console.error(`Error (${status}):`, data);
        } else {
          console.error("Unknown error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId, serviceId, axiosInstance]);

  // Get the duration in minutes from the service
  const duration = formatDuration(service.duration);

  const sessionDuration = service && duration ? parseInt(duration) : 30;

  const handleSlotClick = (slot: ITimeSlot, date: Date, notes?: string) => {
    if (!slot.isReserved) {
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      setSelectedDate(formattedDate);
      setSelectedSlot(slot.time);
      setSelectedEndTime(slot.endTime);
      setSelectedDayNotes(notes || null);
    }
  };

  const handleNextDays = () => {
    if (startDay + 7 < allDates.length) {
      setStartDay(startDay + 7);
    }
  };

  const handlePreviousDays = () => {
    if (startDay - 7 >= 0) {
      setStartDay(startDay - 7);
    }
  };

  const handleBookClick = () => {
    if (!canBook) {
      toast.error(
        "Doctors are not allowed to book appointments for themselves."
      );
    } else if (!service.is_active) {
      toast.error("This service is currently unavailable.");
    } else if (selectedDate && selectedSlot && selectedEndTime) {
      const bookingData = {
        patientId: String(patientId) || "",
        doctorId: doctorId || "",
        serviceId: serviceId || "",
        date: selectedDate,
        time: selectedSlot,
        endTime: selectedEndTime,
        duration: sessionDuration.toString(),
        doctorName: service.doctor_name,
        categoryName: (categoryName as string) || "Psychiatrist",
        serviceName: service.name,
        price: service.price,
        notes: selectedDayNotes,
      };

      // Save booking data to sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
      }

      // Navigate to checkout page without query parameters
      router.push("/doctorList/booking/checkout");
    }
  };

  if (loading) {
    return <SpinnerLoading message="Preparing your booking options..." />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className=" lg:mx-auto lg:container px-6 mt-6 mb-28 font-sans">
      <div className="-mb-10">
        <Heading variant="secondary">Session Booking</Heading>
      </div>

      <div className="flex flex-col justify-center md:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:w-1/4 flex flex-col space-y-6">
          {/* Doctor Info */}
          <div className=" relative flex items-center bg-white py-6 px-2 space-x-2 rounded-lg shadow-md">
            <span
              className={`absolute top-2 right-2 text-sm px-3 py-1 rounded-full font-medium ${
                service.is_active
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {service.is_active ? "Active" : "Inactive"}
            </span>

            {service.image ? (
              <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-full border">
                <Image
                  src={service.image}
                  alt={service.doctor_name || "Doctor"}
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
                className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-2xl font-bold shadow-md ${
                  service.is_active ? "bg-green-500" : "bg-red-500"
                } text-white `}
              >
                {doctorInitial}
              </div>
            )}
            <div>
              <h2 className="text-lg xl:text-2xl font-semibold text-gray-800">
                Dr. {service.doctor_name}
              </h2>
              <p className="text-md text-gray-500">
                {categoryName
                  ? `Specialist in ${categoryName}`
                  : "Psychiatrist"}
              </p>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Service Details
            </h3>
            <p className="text-md text-gray-700">
              <span className="font-medium">Service:</span> {service.name}
            </p>
            {service.description && (
              <p className="text-sm text-gray-600 mt-1">
                {service.description}
              </p>
            )}
            <p className="text-md text-gray-700 mt-2">
              <span className="font-medium">Price:</span> {service.price} EGP
            </p>
            <p className="text-md text-gray-700 mt-2">
              <span className="font-medium">Duration:</span> {sessionDuration}{" "}
              minutes
            </p>
          </div>

          {/* Summary and Booking Button */}
          {selectedSlot && selectedDate && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-800">
                Slot is selected
              </p>
              <p className="text-md text-gray-700">
                {selectedDate} - {selectedSlot} to {selectedEndTime} -{" "}
                {sessionDuration} Min
              </p>

              {selectedDayNotes && (
                <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Schedule Notes:
                  </p>
                  <p className="text-sm text-gray-700">{selectedDayNotes}</p>
                </div>
              )}

              <button
                onClick={handleBookClick}
                className="w-full mt-4 text-lg mx-auto px-6 py-3 btn shadow-md hover:shadow-lg btn-secondary rounded-md font-medium "
              >
                Book Now {service.price} EGP
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="md:w-3/4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
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
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={handleNextDays}
              disabled={startDay + 7 >= allDates.length}
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {visibleDates.map((date) => {
              const { slots: daySlots, notes } = generateTimeSlots(
                availabilities,
                date,
                sessionDuration,
                appointments
              );

              // Check if we have notes for this day's schedule
              const hasNotes = notes && notes.trim().length > 0;

              return (
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

                  {/* Show an info icon if there are notes */}
                  {hasNotes && (
                    <div className="mb-2 px-2">
                      <div className="bg-blue-50 p-2 rounded-md text-xs text-gray-700 border border-blue-200 flex items-start space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="overflow-hidden text-ellipsis line-clamp-2">
                          {notes}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col space-y-2 max-h-72 overflow-y-auto">
                    {daySlots.length > 0 ? (
                      daySlots.map((slot) => (
                        <button
                          key={slot.time}
                          className={`w-full py-2 rounded-md text-sm font-medium ${
                            slot.isReserved
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : selectedSlot === slot.time &&
                                selectedDate ===
                                  date.toLocaleDateString("en-US", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "short",
                                  })
                              ? "bg-[#00978c] text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-[#bbe6e3]"
                          }`}
                          onClick={() => handleSlotClick(slot, date, notes)}
                          disabled={slot.isReserved}
                        >
                          {slot.time} - {slot.endTime}
                        </button>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">
                        No available slots
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              Understanding Your Booking Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-gray-200 rounded-md"></div>
                <div>
                  <p className="font-medium text-gray-700">Available</p>
                  <p className="text-sm text-gray-600">
                    Time slot is open for booking
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-[#00978c] rounded-md"></div>
                <div>
                  <p className="font-medium text-gray-700">Selected</p>
                  <p className="text-sm text-gray-600">
                    Your currently selected time slot
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-red-500 rounded-md"></div>
                <div>
                  <p className="font-medium text-gray-700">Unavailable</p>
                  <p className="text-sm text-gray-600">
                    This slot has been booked
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-blue-800">Note:</span> After
                selecting a time slot, please review your selection in the
                booking summary on the left before confirming your appointment.
              </p>
            </div>
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

function bookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionBooking />
    </Suspense>
  );
}

export default withAuth(bookingPage);
