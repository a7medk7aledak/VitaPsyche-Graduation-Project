"use client";

import withAuth from "@components/auth/WithAuth";
import Heading from "@components/common/Heading";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import useAxios from "@hooks/useAxios";
import { useCheckDoctorPermissions } from "@hooks/useCheckDoctorPermissions";
import { IAppointment, IAvailability } from "@myTypes/appointments";
import { RootState } from "@store/store";
import { useCategoryLookup } from "@utils/categoryLookup";
import { formatDuration, getInitial } from "@utils/doctorUtils";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

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

interface ITimeSlot {
  time: string;
  endTime: string;
  isReserved: boolean;
}

interface ISelection {
  date: string | null;
  slot: string | null;
  endTime: string | null;
  notes: string | null;
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

// Helper functions
const generateDates = (startDate: Date, days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Format just the date without time
const formatDateOnly = (dateString: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Convert time string (HH:MM) to minutes from midnight
const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

// Convert minutes from midnight to formatted time string (H:MM AM/PM)
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
};

// Helper function to create a full date object from a date and time string
const createDateTime = (date: Date, timeStr: string): Date => {
  const result = new Date(date);
  const [time, period] = timeStr.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  // Handle AM/PM conversion
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  result.setHours(hour, minute, 0, 0);
  return result;
};

// Check if a slot is reserved based on appointments
const isSlotReserved = (
  date: Date,
  slotStartTime: string,
  appointments: IAppointment[]
): boolean => {
  // Create a date object for the slot
  const slotDateTime = createDateTime(date, slotStartTime);

  return appointments.some((appointment) => {
    // Create a date from the appointment time and adjust for timezone
    const appointmentTime = new Date(appointment.date_time);
    appointmentTime.setHours(appointmentTime.getHours() - 2);

    // Compare the times (ignoring seconds and milliseconds)
    return (
      appointmentTime.getFullYear() === slotDateTime.getFullYear() &&
      appointmentTime.getMonth() === slotDateTime.getMonth() &&
      appointmentTime.getDate() === slotDateTime.getDate() &&
      appointmentTime.getHours() === slotDateTime.getHours() &&
      appointmentTime.getMinutes() === slotDateTime.getMinutes()
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

// Component for time slot button
const TimeSlot = ({
  slot,
  isSelected,
  onClick,
  disabled,
}: {
  slot: ITimeSlot;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className={`w-full py-2 rounded-md text-sm font-medium ${
        disabled
          ? "bg-red-500 text-white cursor-not-allowed"
          : isSelected
          ? "bg-[#00978c] text-white"
          : "bg-gray-200 text-gray-700 hover:bg-[#bbe6e3]"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {slot.time} - {slot.endTime}
    </button>
  );
};

// Component for date column
const DateColumn = ({
  date,
  slots,
  notes,
  selectedDate,
  selectedSlot,
  onSlotClick,
}: {
  date: Date;
  slots: ITimeSlot[];
  notes?: string;
  selectedDate: string | null;
  selectedSlot: string | null;
  onSlotClick: (slot: ITimeSlot, date: Date, notes?: string) => void;
}) => {
  const formattedDate = formatDateOnly(date);
  const hasNotes = notes && notes.trim().length > 0;

  return (
    <div className="border rounded-lg p-4 bg-gray-100">
      <h4 className="text-md font-semibold text-center text-blue-800 mb-2">
        {formattedDate}
      </h4>

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
        {slots.length > 0 ? (
          slots.map((slot) => (
            <TimeSlot
              key={slot.time}
              slot={slot}
              isSelected={
                selectedSlot === slot.time && selectedDate === formattedDate
              }
              onClick={() => onSlotClick(slot, date, notes)}
              disabled={slot.isReserved}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No available slots</p>
        )}
      </div>
    </div>
  );
};

// Component for doctor info card
const DoctorInfoCard = ({
  service,
  doctorInitial,
  categoryName,
}: {
  service: IService;
  doctorInitial: string;
  categoryName: string | number | null;
}) => {
  return (
    <div className="relative flex items-center bg-white py-6 px-2 space-x-2 rounded-lg shadow-md">
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
          {categoryName ? `Specialist in ${categoryName}` : "Psychiatrist"}
        </p>
      </div>
    </div>
  );
};

// Component for service details
const ServiceDetails = ({
  service,
  sessionDuration,
}: {
  service: IService;
  sessionDuration: number;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Service Details
      </h3>
      <p className="text-md text-gray-700">
        <span className="font-medium">Service:</span> {service.name}
      </p>
      {service.description && (
        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
      )}
      <p className="text-md text-gray-700 mt-2">
        <span className="font-medium">Price:</span> {service.price} EGP
      </p>
      <p className="text-md text-gray-700 mt-2">
        <span className="font-medium">Duration:</span> {sessionDuration} minutes
      </p>
    </div>
  );
};

// Component for booking summary
const BookingSummary = ({
  selection,
  service,
  sessionDuration,
  onBookClick,
}: {
  selection: ISelection;
  service: IService;
  sessionDuration: number;
  onBookClick: () => void;
}) => {
  if (!selection.date || !selection.slot || !selection.endTime) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-800">Slot is selected</p>
      <p className="text-md text-gray-700">
        {selection.date} - {selection.slot} to {selection.endTime} -{" "}
        {sessionDuration} Min
      </p>

      {selection.notes && (
        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-200">
          <p className="text-sm font-medium text-blue-800 mb-1">
            Schedule Notes:
          </p>
          <p className="text-sm text-gray-700">{selection.notes}</p>
        </div>
      )}

      <button
        onClick={onBookClick}
        className="w-full mt-4 text-lg mx-auto px-6 py-3 btn shadow-md hover:shadow-lg btn-secondary rounded-md font-medium "
      >
        Book Now {service.price} EGP
      </button>
    </div>
  );
};

// Main SessionBooking component
const SessionBooking = () => {
  const router = useRouter();
  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const getCategory = useCategoryLookup();

  // State
  const [service, setService] = useState<IService>(defaultService);
  const [availabilities, setAvailabilities] = useState<IAvailability[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDay, setStartDay] = useState(0);
  const [selection, setSelection] = useState<ISelection>({
    date: null,
    slot: null,
    endTime: null,
    notes: null,
  });

  // Get params and user details
  const serviceId = searchParams?.get("serviceId") ?? null;
  const doctorId = searchParams?.get("doctorId") ?? null;
  const doctorInitial = getInitial(service.doctor_name);
  const categoryName = getCategory(service.category);
  const { canBook } = useCheckDoctorPermissions(doctorId);

  const patientId = useSelector(
    (state: RootState) => state.auth.user?.patient_details?.id
  );

  // Get the duration in minutes from the service
  const duration = formatDuration(service.duration);
  const sessionDuration = service && duration ? parseInt(duration) : 30;

  // Memoized dates
  const allDates = useMemo(() => generateDates(new Date(), 14), []);
  const visibleDates = useMemo(
    () => allDates.slice(startDay, startDay + 7),
    [allDates, startDay]
  );

  // Memoized time slots by date
  const timeSlotsData = useMemo(
    () =>
      visibleDates.map((date) => ({
        date,
        ...generateTimeSlots(
          availabilities,
          date,
          sessionDuration,
          appointments
        ),
      })),
    [visibleDates, availabilities, sessionDuration, appointments]
  );

  // Load data on component mount
  useEffect(() => {
    if (!doctorId) {
      router.push("/doctorList");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch doctor availabilities, appointments, and service details in parallel
        const [availabilityResponse, appointmentsResponse, serviceResponse] =
          await Promise.all([
            axiosInstance.get(`/api/availabilities?doctorId=${doctorId}`),
            axiosInstance.get(`/api/appointments?doctorId=${doctorId}`),
            serviceId
              ? axiosInstance.get(`/api/services?serviceId=${serviceId}`)
              : Promise.resolve({ data: defaultService }),
          ]);

        setAvailabilities(availabilityResponse.data);
        setAppointments(appointmentsResponse.data);

        if (serviceResponse.data) {
          setService(serviceResponse.data);
        }
      } catch (err) {
        if (isAxiosError(err)) {
          const { status } = err.response || { status: 500 };

          switch (status) {
            case 404:
              setError(
                "Doctor or service not found. Please check your selection."
              );
              break;
            case 401:
              setError("Please log in to access booking services.");
              router.push("/login");
              break;
            default:
              setError(
                "Unable to load booking information. Please try again later."
              );
          }

          console.error(`Error (${status}):`, err.response?.data);
        } else {
          setError("Connection error. Please check your internet connection.");
          console.error("Unknown error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId, serviceId, axiosInstance, router]);

  // Event handlers
  const handleSlotClick = (slot: ITimeSlot, date: Date, notes?: string) => {
    if (!slot.isReserved) {
      const formattedDate = formatDateOnly(date);

      setSelection({
        date: formattedDate,
        slot: slot.time,
        endTime: slot.endTime,
        notes: notes || null,
      });
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
      return;
    }

    if (!service.is_active) {
      toast.error("This service is currently unavailable.");
      return;
    }

    if (selection.date && selection.slot && selection.endTime) {
      const bookingData = {
        patientId: String(patientId) || "",
        doctorId: doctorId || "",
        serviceId: serviceId || "",
        date: selection.date,
        time: selection.slot,
        endTime: selection.endTime,
        duration: sessionDuration.toString(),
        doctorName: service.doctor_name,
        categoryName: (categoryName as string) || "Psychiatrist",
        serviceName: service.name,
        price: service.price,
        notes: selection.notes,
      };

      // Save booking data to sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
      }

      // Navigate to checkout page
      router.push("/doctorList/booking/checkout");
    }
  };

  // Render loading state
  if (loading) {
    return <SpinnerLoading message="Preparing your booking options..." />;
  }

  // Render error state
  if (error) {
    return (
      <div className="text-center text-red-500 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Render main content
  return (
    <div className="lg:mx-auto lg:container px-6 mt-6 mb-28 font-sans">
      <div className="-mb-10">
        <Heading variant="secondary">Session Booking</Heading>
      </div>

      <div className="flex flex-col justify-center md:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:w-1/4 flex flex-col space-y-6">
          {/* Doctor Info */}
          <DoctorInfoCard
            service={service}
            doctorInitial={doctorInitial}
            categoryName={categoryName}
          />

          {/* Service Info */}
          <ServiceDetails service={service} sessionDuration={sessionDuration} />

          {/* Booking Summary */}
          <BookingSummary
            selection={selection}
            service={service}
            sessionDuration={sessionDuration}
            onBookClick={handleBookClick}
          />
        </div>

        {/* Right Section - Calendar */}
        <div className="md:w-3/4 bg-white p-4 rounded-lg shadow-md">
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={handlePreviousDays}
              disabled={startDay === 0}
            >
              &lt;
            </button>
            <h3 className="text-lg font-semibold text-gray-800">
              {formatDateOnly(visibleDates[0])} -{" "}
              {formatDateOnly(visibleDates[visibleDates.length - 1])}
            </h3>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={handleNextDays}
              disabled={startDay + 7 >= allDates.length}
            >
              &gt;
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {timeSlotsData.map(({ date, slots, notes }) => (
              <DateColumn
                key={date.toDateString()}
                date={date}
                slots={slots}
                notes={notes}
                selectedDate={selection.date}
                selectedSlot={selection.slot}
                onSlotClick={handleSlotClick}
              />
            ))}
          </div>

          {/* Legend */}
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

          {/* Timezone note */}
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

// Wrap with Suspense for SSR compatibility
function bookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionBooking />
    </Suspense>
  );
}

export default withAuth(bookingPage);
