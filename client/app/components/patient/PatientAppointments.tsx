import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaInfoCircle,
  FaFilter,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationCircle,
  FaListUl,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { motion } from "framer-motion";
import useAxios from "@hooks/useAxios";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { isAxiosError } from "axios";
import { IAppointment, ICancelAppointmentPayload } from "@myTypes/appointments";

const PatientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    IAppointment[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [processingAppointmentId, setProcessingAppointmentId] = useState<
    number | null
  >(null);

  const axiosInstance = useAxios();
  const patientId = useSelector(
    (state: RootState) => state.auth.user?.patient_details?.id
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    if (!patientId) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `/api/appointments?patientId=${patientId}`
      );
      setAppointments(response.data);
      setFilteredAppointments(
        statusFilter === "all"
          ? response.data
          : response.data.filter(
              (appointment: IAppointment) => appointment.status === statusFilter
            )
      );
    } catch (error) {
      setError("Failed to load appointments. Please try again later.");
      if (isAxiosError(error)) {
        const { status, data } = error.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      timeZone: "UTC",
    });
  };

  const handleCancelAppointment = async (appointment: IAppointment) => {
    if (processingAppointmentId) return;
    try {
      setProcessingAppointmentId(appointment.id);
      setIsProcessing(true);
      const payload: ICancelAppointmentPayload = {
        id: appointment.id,
        date_time: appointment.date_time,
        status: "cancelled",
        cost: appointment.cost,
        notes: appointment.notes,
        appointment_address: appointment.appointment_address,
        is_follow_up: appointment.is_follow_up,
        is_confirmed: appointment.is_confirmed,
        patient: appointment.patient,
        doctor: appointment.doctor,
      };
      await axiosInstance.put(`/api/appointments/`, payload);
      await fetchAppointments();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      setError("Failed to cancel appointment. Please try again.");
    } finally {
      setProcessingAppointmentId(null);
      setIsProcessing(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Error Message */}
      {error && (
        <motion.div
          variants={errorVariants}
          initial="hidden"
          animate="visible"
          className="bg-red-50 p-3 rounded-lg mb-4"
        >
          <div className="flex items-center space-x-3">
            <FaInfoCircle className="text-red-500 text-lg flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Appointments
        </h2>
        <div className="flex items-center space-x-3">
          {isProcessing && (
            <span className="text-xs text-gray-500">Processing...</span>
          )}
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
            <FaFilter className="text-teal-600 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-0 focus:ring-0 text-sm font-medium text-gray-700 bg-transparent"
              disabled={isProcessing}
            >
              <option value="all">All appointments</option>
              <option value="booked">Booked</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && !appointments.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center py-4"
        >
          <SpinnerLoading message="Loading appointments..." />
        </motion.div>
      )}

      {/* No Appointments Found */}
      {filteredAppointments.length === 0 && !isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-sm border border-gray-100 rounded-lg p-8 text-center"
        >
          <FaCalendarAlt className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500">
            {statusFilter !== "all"
              ? `You have no ${statusFilter} appointments.`
              : "You haven't scheduled any appointments yet."}
          </p>
        </motion.div>
      )}

      {/* Appointment List */}
      {filteredAppointments.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md ${
                processingAppointmentId === appointment.id ? "opacity-75" : ""
              }`}
            >
              <div className="px-6 py-5">
                {/* Header with status badges */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="flex items-center mb-3 md:mb-0">
                    <FaUserMd className="mr-3 text-teal-600" />
                    <h3 className="font-medium text-gray-800">
                      {appointment.doctor_first_name &&
                      appointment.doctor_last_name
                        ? `Dr. ${appointment.doctor_first_name} ${appointment.doctor_last_name}`
                        : "Doctor not assigned yet"}
                    </h3>
                  </div>
                  <div className="flex space-x-2 items-center">
                    {appointment.status !== "cancelled" &&
                      appointment.is_follow_up && (
                        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                          Follow-up
                        </span>
                      )}
                    <div
                      className={`px-3 py-1 rounded-full border ${getStatusBadgeClass(
                        appointment.status
                      )} text-xs font-medium capitalize`}
                    >
                      {appointment.status}
                    </div>
                  </div>
                </div>

                {/* Appointment details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-3">
                      <FaCalendarAlt className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Date
                      </p>
                      <p className="font-medium text-gray-800">
                        {formatDate(appointment.date_time)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-3">
                      <FaClock className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Time
                      </p>
                      <p className="font-medium text-gray-800">
                        {formatTime(appointment.date_time)}
                      </p>
                    </div>
                  </div>
                  {appointment.cost && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-3">
                        <FaMoneyBillWave className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Cost
                        </p>
                        <p className="font-medium text-gray-800">
                          {appointment.cost} EGP
                        </p>
                      </div>
                    </div>
                  )}
                  {appointment.status !== "cancelled" && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-3">
                        {appointment.is_confirmed ? (
                          <FaCheckCircle className="text-green-600" />
                        ) : (
                          <FaExclamationCircle className="text-amber-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Confirmation
                        </p>
                        <p className="font-medium text-gray-800">
                          {appointment.is_confirmed
                            ? "Confirmed"
                            : "Awaiting confirmation"}
                        </p>
                      </div>
                    </div>
                  )}
                  {appointment.services.length > 0 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-3">
                        <FaListUl className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Service
                        </p>
                        <p className="font-medium text-gray-800">
                          {appointment.services[0].name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes section */}
                {appointment.notes && (
                  <div className="mt-5 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      {appointment.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Action footer */}
              {appointment.status !== "cancelled" && (
                <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 border-t border-gray-100">
                  <button
                    className={`px-4 py-2 text-sm text-teal-700 font-medium transition-colors ${
                      processingAppointmentId
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:text-teal-800"
                    }`}
                    disabled={!!processingAppointmentId}
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(appointment)}
                    disabled={!!processingAppointmentId}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      processingAppointmentId === appointment.id
                        ? "bg-red-50 text-red-300"
                        : processingAppointmentId
                        ? "text-red-300 cursor-not-allowed"
                        : "text-red-600 hover:text-red-700"
                    }`}
                  >
                    {processingAppointmentId === appointment.id ? (
                      <span className="flex items-center">
                        <span className="w-3 h-3 border-2 border-red-300 border-t-transparent rounded-full animate-spin mr-2"></span>
                        Cancelling
                      </span>
                    ) : (
                      "Cancel"
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PatientAppointments;
