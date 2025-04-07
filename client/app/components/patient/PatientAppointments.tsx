import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserMd,
  FaInfoCircle,
  FaFilter,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "@hooks/useAxios";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { isAxiosError } from "axios";

interface Appointment {
  id: number;
  created_at: string;
  updated_at: string;
  date_time: string;
  status: "booked" | "confirmed" | "cancelled";
  cost: string | null;
  notes: string | null;
  appointment_address: string | null;
  is_follow_up: boolean;
  is_confirmed: boolean;
  patient: number;
  doctor: number | null;
  services: number[];
}

const PatientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // Add this flag to prevent animation on initial load
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  const axiosInstance = useAxios();
  const patientId = useSelector(
    (state: RootState) => state.auth.user?.patient_details?.id
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/api/appointments?patientId=${patientId}`
        );
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to load appointments. Please try again later.");

        if (isAxiosError(error)) {
          // The server's processed error (from axiosErrorHandler) is now in err.response
          const { status, data } = error.response || {
            status: 500,
            data: { message: "Unknown error occurred" },
          };
          console.error(`Error (${status}):`, data);
        }
      } finally {
        setIsLoading(false);
        // Mark initial load as complete after a short delay
        setTimeout(() => setInitialLoadComplete(true), 100);
      }
    };

    fetchAppointments();
  }, [axiosInstance, patientId]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter(
          (appointment) => appointment.status === statusFilter
        )
      );
    }
  }, [statusFilter, appointments]);

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "booked":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateTimeString: string): string => {
    return new Date(dateTimeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <SpinnerLoading message="loading appointments..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <FaInfoCircle className="text-red-500 text-xl" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  // Animation constants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
        <div className="flex items-center space-x-2">
          <FaFilter className="text-teal-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 text-sm"
          >
            <option value="all">All appointments</option>
            <option value="booked">Booked</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <FaCalendarAlt className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500">
            {statusFilter !== "all"
              ? `You have no ${statusFilter} appointments.`
              : "You haven't scheduled any appointments yet."}
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial={initialLoadComplete ? "hidden" : "visible"}
            animate="visible"
          >
            {filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
                layout
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        Appointment #{appointment.id}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaUserMd className="mr-2 text-teal-600" />
                        <span>
                          {appointment.doctor
                            ? `Doctor ID: ${appointment.doctor}`
                            : "No doctor assigned"}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                      {appointment.is_follow_up && (
                        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                          Follow-up
                        </span>
                      )}
                      <div
                        className={`px-3 py-1 rounded-full border ${getStatusBadgeClass(
                          appointment.status
                        )} text-sm font-medium capitalize`}
                      >
                        {appointment.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-teal-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-800">
                          {formatDate(appointment.date_time)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-teal-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium text-gray-800">
                          {formatTime(appointment.date_time)}
                        </p>
                      </div>
                    </div>
                    {appointment.appointment_address && (
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-teal-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium text-gray-800">
                            {appointment.appointment_address}
                          </p>
                        </div>
                      </div>
                    )}
                    {appointment.cost && (
                      <div className="flex items-center">
                        <FaMoneyBillWave className="text-teal-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Cost</p>
                          <p className="font-medium text-gray-800">
                            ${appointment.cost}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center">
                      {appointment.is_confirmed ? (
                        <FaCheckCircle className="text-green-600 mr-3" />
                      ) : (
                        <FaExclamationCircle className="text-amber-500 mr-3" />
                      )}
                      <div>
                        <p className="text-sm text-gray-500">
                          Confirmation Status
                        </p>
                        <p className="font-medium text-gray-800">
                          {appointment.is_confirmed
                            ? "Confirmed"
                            : "Awaiting confirmation"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                  {appointment.status !== "cancelled" && (
                    <>
                      <button className="px-4 py-2 text-sm text-teal-700 hover:text-teal-800 font-medium">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium">
                        Cancel
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PatientAppointments;
