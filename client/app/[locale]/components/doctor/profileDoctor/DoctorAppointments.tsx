"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import useAxios from "@hooks/useAxios";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import {
  IAppointment,
  ICancelAppointmentPayload,
  IServiceBooked,
} from "@myTypes/appointments";

const DoctorAppointments: React.FC = () => {
  const doctorId = useSelector(
    (state: RootState) => state.auth.user?.doctor_details?.id
  );
  const axiosInstance = useAxios();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    IAppointment[]
  >([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionInProgress, setActionInProgress] = useState<boolean>(false);

  // New state for confirmation modal
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<{
    appointmentId: number;
    newStatus: "booked" | "confirmed" | "cancelled";
    actionText: string;
  } | null>(null);

  // Toggle for confirmation dialogs
  const [requireConfirmation, setRequireConfirmation] = useState<boolean>(true);

  // Fetch appointments from API
  const fetchAppointments = async () => {
    if (refreshing) return;

    setLoading(true);
    setRefreshing(true);

    try {
      if (!doctorId) {
        throw new Error("Doctor ID not found");
      }

      const response = await axiosInstance.get(
        `/api/appointments?doctorId=${doctorId}`
      );

      if (response.status === 200) {
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const { status, data } = error.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
        toast.error(
          `Failed to load appointments: ${data.message || "Unknown error"}`
        );
      } else {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [doctorId]);

  // Filter appointments based on status and date
  useEffect(() => {
    let filtered = [...appointments];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === statusFilter
      );
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toISOString().split("T")[0];
      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(appointment.date_time)
          .toISOString()
          .split("T")[0];
        return appointmentDate === filterDate;
      });
    }

    setFilteredAppointments(filtered);
  }, [statusFilter, dateFilter, appointments]);

  // Get patient's full name
  const getPatientFullName = (appointment: IAppointment): string => {
    return (
      `${appointment.patient_first_name} ${appointment.patient_last_name}`.trim() ||
      `Patient #${appointment.patient}`
    );
  };

  // Get service names
  const getServiceNames = (appointment: IAppointment): string => {
    if (appointment.services && appointment.services.length > 0) {
      return appointment.services
        .map((service: IServiceBooked) => service.name)
        .join(", ");
    }
    return "No service";
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Process status change - either show confirmation or process immediately
  const processStatusChange = (
    appointmentId: number,
    newStatus: "booked" | "confirmed" | "cancelled"
  ) => {
    // Generate action text based on the new status
    let actionText = "";
    switch (newStatus) {
      case "confirmed":
        actionText = "confirm";
        break;
      case "cancelled":
        actionText = "cancel";
        break;
      case "booked":
        actionText = "rebook";
        break;
    }

    if (requireConfirmation) {
      // Show confirmation dialog
      setPendingAction({
        appointmentId,
        newStatus,
        actionText,
      });
      setShowConfirmation(true);
    } else {
      // Process immediately
      handleStatusChange(appointmentId, newStatus);
    }
  };

  // Handle status change
  const handleStatusChange = async (
    appointmentId?: number,
    newStatus?: "booked" | "confirmed" | "cancelled"
  ) => {
    if (actionInProgress) return;

    // Determine which data to use (from pendingAction or params)
    const targetId =
      appointmentId || (pendingAction ? pendingAction.appointmentId : null);
    const targetStatus =
      newStatus || (pendingAction ? pendingAction.newStatus : null);

    if (!targetId || !targetStatus) {
      toast.error("Invalid appointment data");
      return;
    }

    setActionInProgress(true);

    try {
      // Find the appointment to update
      const appointmentToUpdate = appointments.find(
        (app) => app.id === targetId
      );

      if (!appointmentToUpdate) {
        toast.error("Appointment not found");
        return;
      }

      // Prepare updated data
      const updatedData: ICancelAppointmentPayload = {
        id: appointmentToUpdate.id,
        date_time: appointmentToUpdate.date_time,
        status: targetStatus,
        cost: appointmentToUpdate.cost,
        notes: appointmentToUpdate.notes,
        appointment_address: appointmentToUpdate.appointment_address,
        is_follow_up: appointmentToUpdate.is_follow_up,
        is_confirmed: targetStatus === "confirmed",
        patient: appointmentToUpdate.patient,
        doctor: appointmentToUpdate.doctor,
      };

      // Send PUT request to update the appointment
      const response = await axiosInstance.put(
        `/api/appointments/`,
        updatedData
      );

      if (response.status === 200) {
        // Show success message
        const statusText =
          targetStatus.charAt(0).toUpperCase() + targetStatus.slice(1);
        toast.success(`Appointment ${statusText} successfully`);

        // Refresh appointments from backend after status change
        await fetchAppointments();

        // Close modal if open
        if (isModalOpen) {
          setSelectedAppointment(null);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const { status, data } = error.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
        toast.error(
          `Failed to update appointment: ${data.message || "Unknown error"}`
        );
      } else {
        console.error("Error updating appointment:", error);
        toast.error("Failed to update appointment");
      }
    } finally {
      setActionInProgress(false);
      setShowConfirmation(false);
      setPendingAction(null);
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case "booked":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Open detail modal
  const openDetailModal = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Confirmation modal component
  const ConfirmationModal = () => {
    if (!showConfirmation || !pendingAction) return null;

    // Get the appointment to be updated
    const appointment = appointments.find(
      (app) => app.id === pendingAction.appointmentId
    );
    if (!appointment) return null;

    // Get patient name
    const patientName = getPatientFullName(appointment);

    // Get action details
    const actionText = pendingAction.actionText;
    let actionColor = "";

    switch (pendingAction.newStatus) {
      case "confirmed":
        actionColor = "green";
        break;
      case "cancelled":
        actionColor = "red";
        break;
      case "booked":
        actionColor = "yellow";
        break;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Confirm Action</h2>

          <p className="mb-6">
            Are you sure you want to{" "}
            <span className={`font-bold text-${actionColor}-600`}>
              {actionText}
            </span>{" "}
            the appointment for <span className="font-bold">{patientName}</span>{" "}
            on{" "}
            <span className="font-bold">
              {formatDate(appointment.date_time)}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowConfirmation(false);
                setPendingAction(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => handleStatusChange()}
              disabled={actionInProgress}
              className={`px-4 py-2 bg-${actionColor}-600 text-white rounded hover:bg-${actionColor}-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {actionInProgress ? "Processing..." : `Yes, ${actionText}`}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Detail modal component
  const AppointmentDetailModal = () => {
    if (!selectedAppointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Appointment Details</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 font-semibold">Patient</p>
              <p className="text-lg">
                {getPatientFullName(selectedAppointment)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Service</p>
              <p className="text-lg">{getServiceNames(selectedAppointment)}</p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Date & Time</p>
              <p className="text-lg">
                {formatDate(selectedAppointment.date_time)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Status</p>
              <p
                className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(
                  selectedAppointment.status
                )}`}
              >
                {selectedAppointment.status.charAt(0).toUpperCase() +
                  selectedAppointment.status.slice(1)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Cost</p>
              <p className="text-lg">
                {selectedAppointment.cost
                  ? `$${selectedAppointment.cost}`
                  : "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Location</p>
              <p className="text-lg">
                {selectedAppointment.appointment_address || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Follow-up</p>
              <p className="text-lg">
                {selectedAppointment.is_follow_up ? "Yes" : "No"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Created</p>
              <p className="text-lg">
                {formatDate(selectedAppointment.created_at)}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 font-semibold">Notes</p>
            <p className="text-lg">{selectedAppointment.notes || "No notes"}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {selectedAppointment.status !== "confirmed" && (
              <button
                onClick={() =>
                  processStatusChange(selectedAppointment.id, "confirmed")
                }
                disabled={actionInProgress}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionInProgress ? "Processing..." : "Confirm Appointment"}
              </button>
            )}

            {selectedAppointment.status !== "cancelled" && (
              <button
                onClick={() =>
                  processStatusChange(selectedAppointment.id, "cancelled")
                }
                disabled={actionInProgress}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionInProgress ? "Processing..." : "Cancel Appointment"}
              </button>
            )}

            {selectedAppointment.status === "cancelled" && (
              <button
                onClick={() =>
                  processStatusChange(selectedAppointment.id, "booked")
                }
                disabled={actionInProgress}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionInProgress ? "Processing..." : "Rebook Appointment"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Toggle switch component for confirmation settings
  const ConfirmationToggle = () => {
    return (
      <div className="flex  mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Require confirmation for actions:
          </span>
          <button
            onClick={() => setRequireConfirmation(!requireConfirmation)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00bfa5] ${
              requireConfirmation ? "bg-[#00bfa5]" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={requireConfirmation}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                requireConfirmation ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs text-gray-500">
            {requireConfirmation ? "On" : "Off"}
          </span>
        </div>
      </div>
    );
  };

  // If doctor ID is not available, show appropriate message
  if (!doctorId && !loading) {
    return (
      <div className="mt-6 p-6 bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-xl font-semibold text-red-700 mb-3">
          Doctor Profile Not Found
        </h2>
        <p className="text-red-600">
          Doctor profile information is not available. Please make sure your
          account is properly set up as a doctor.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Appointments Management
      </h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <label
            htmlFor="status-filter"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00bfa5]"
          >
            <option value="all">All Statuses</option>
            <option value="booked">Booked</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label
            htmlFor="date-filter"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Filter by Date
          </label>
          <input
            id="date-filter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00bfa5]"
          />
        </div>

        <div className="w-full md:w-1/3 flex items-end">
          <button
            onClick={() => {
              setStatusFilter("all");
              setDateFilter("");
            }}
            className="w-full p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-blue-800 font-medium mb-2">Total Appointments</h3>
          <p className="text-2xl font-bold text-blue-900">
            {appointments.length}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-green-800 font-medium mb-2">Confirmed</h3>
          <p className="text-2xl font-bold text-green-900">
            {appointments.filter((a) => a.status === "confirmed").length}
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="text-yellow-800 font-medium mb-2">Pending</h3>
          <p className="text-2xl font-bold text-yellow-900">
            {appointments.filter((a) => a.status === "booked").length}
          </p>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0  md:justify-between">
        <button
          onClick={fetchAppointments}
          className="px-4 py-2 bg-[#00bfa5] hover:bg-[#139485] text-white rounded transition focus:outline-none focus:ring-2 focus:ring-[#00bfa5] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || refreshing}
        >
          {loading || refreshing ? (
            <>
              <span className="inline-block mr-2 animate-spin">⟳</span>
              Loading...
            </>
          ) : (
            "Refresh Appointments"
          )}
        </button>
        {/* Confirmation toggle */}
        <ConfirmationToggle />
      </div>

      {/* Appointments Table */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-center">
            <div className="spinner"></div>
            <p className="mt-2 text-gray-600">Loading appointments...</p>
          </div>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No appointments found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No appointments found matching your filters.
          </p>
          {statusFilter !== "all" || dateFilter !== "" ? (
            <div className="mt-3">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setDateFilter("");
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00bfa5] hover:bg-[#139485] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00bfa5]"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getPatientFullName(appointment)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(appointment.date_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getServiceNames(appointment)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openDetailModal(appointment)}
                      className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={actionInProgress}
                    >
                      View
                    </button>
                    {appointment.status === "booked" && (
                      <button
                        onClick={() =>
                          processStatusChange(appointment.id, "confirmed")
                        }
                        className="text-green-600 hover:text-green-900 mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={actionInProgress}
                      >
                        Confirm
                      </button>
                    )}
                    {appointment.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          processStatusChange(appointment.id, "cancelled")
                        }
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={actionInProgress}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {isModalOpen && <AppointmentDetailModal />}

      {/* Confirmation Modal */}
      <ConfirmationModal />

      {/* CSS for spinner */}
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #00bfa5;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DoctorAppointments;
