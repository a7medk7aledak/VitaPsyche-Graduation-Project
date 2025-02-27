"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import useAxios from "@hooks/useAxios";

interface Appointment {
  id: number;
  created_at: string;
  updated_at: string;
  date_time: string;
  status: "booked" | "confirmed" | "cancelled";
  cost: string;
  notes: string | null;
  appointment_address: string | null;
  is_follow_up: boolean;
  is_confirmed: boolean;
  patient: number;
  doctor: number | null;
  services: number[];

  // Additional fields for UI display that may come from the API
  patientName?: string;
  serviceName?: string;
}

const DoctorAppointments: React.FC = () => {
  const doctorId = useSelector(
    (state: RootState) => state.auth.user?.doctor_details?.id
  );
  const axiosInstance = useAxios();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch appointments from API
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/appointments?doctorId=${doctorId}`
      );

      // Store the fetched appointments
      // Assuming the API already returns appointments with patientName and serviceName
      setAppointments(response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
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

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle status change
  const handleStatusChange = async (
    appointmentId: number,
    newStatus: "booked" | "confirmed" | "cancelled"
  ) => {
    try {
      // Find the appointment to update
      const appointmentToUpdate = appointments.find(
        (app) => app.id === appointmentId
      );

      if (!appointmentToUpdate) {
        console.error("Appointment not found");
        return;
      }

      // Prepare updated data
      const updatedData = {
        ...appointmentToUpdate,
        status: newStatus,
        is_confirmed: newStatus === "confirmed",
      };

      // Send PUT request to update the appointment
      await axiosInstance.put(
        `/api/appointments/${appointmentId}/`,
        updatedData
      );

      // Update local state
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === appointmentId) {
          return {
            ...appointment,
            status: newStatus,
            is_confirmed: newStatus === "confirmed",
            updated_at: new Date().toISOString(),
          };
        }
        return appointment;
      });

      setAppointments(updatedAppointments);

      // Close modal if open
      setSelectedAppointment(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (appointmentId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this appointment? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // Send DELETE request
      await axiosInstance.delete(`/api/appointments/${appointmentId}/`);

      // Update local state
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== appointmentId
      );

      setAppointments(updatedAppointments);

      // Close modal if open
      setSelectedAppointment(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
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
  const openDetailModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
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
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 font-semibold">Patient</p>
              <p className="text-lg">
                {selectedAppointment.patientName || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold">Service</p>
              <p className="text-lg">
                {selectedAppointment.serviceName || "Unknown"}
              </p>
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
              <p className="text-lg">${selectedAppointment.cost}</p>
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
                  handleStatusChange(selectedAppointment.id, "confirmed")
                }
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Confirm Appointment
              </button>
            )}

            {selectedAppointment.status !== "cancelled" && (
              <button
                onClick={() =>
                  handleStatusChange(selectedAppointment.id, "cancelled")
                }
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Cancel Appointment
              </button>
            )}

            {selectedAppointment.status === "cancelled" && (
              <button
                onClick={() =>
                  handleStatusChange(selectedAppointment.id, "booked")
                }
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
              >
                Rebook Appointment
              </button>
            )}

            <button
              onClick={() => handleDeleteAppointment(selectedAppointment.id)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Delete Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Appointments Management
      </h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="booked">Booked</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Filter by Date
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-full md:w-1/3 flex items-end">
          <button
            onClick={() => {
              setStatusFilter("all");
              setDateFilter("");
            }}
            className="w-full p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mb-4">
        <button
          onClick={fetchAppointments}
          className="px-4 py-2 bg-[#00bfa5] hover:bg-[#139485] text-white rounded transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Appointments"}
        </button>
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
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">
            No appointments found matching your filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
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
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.patientName ||
                      `Patient #${appointment.patient}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(appointment.date_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.serviceName ||
                      (appointment.services && appointment.services.length > 0
                        ? `Service #${appointment.services[0]}`
                        : "No service")}
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
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    {appointment.status === "booked" && (
                      <button
                        onClick={() =>
                          handleStatusChange(appointment.id, "confirmed")
                        }
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Confirm
                      </button>
                    )}
                    {appointment.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          handleStatusChange(appointment.id, "cancelled")
                        }
                        className="text-red-600 hover:text-red-900"
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
