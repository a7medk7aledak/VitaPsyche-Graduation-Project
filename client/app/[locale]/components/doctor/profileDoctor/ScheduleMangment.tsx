"use client";
import React, { useCallback, useEffect, useState } from "react";
import Schedule from "./Schedule";
import useAxios from "@hooks/useAxios";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { isAxiosError } from "axios";
import { IAvailability } from "@myTypes/appointments";
import { useTranslations } from "next-intl";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const API_URL = "/api/availabilities";

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const ScheduleManagement = () => {
  const t  = useTranslations();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [schedules, setSchedules] = useState<IAvailability[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(
    null
  );
  const [newSchedule, setNewSchedule] = useState<IAvailability>({
    id: 0,
    day_of_week: "",
    start_time: "",
    end_time: "",
    max_patients_per_slot: 0,
    notes: "",
  });

  const doctorId = useSelector(
    (state: RootState) => state.auth.user?.doctor_details?.id
  );

  const axiosInstance = useAxios();

  const fetchSchedules = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}?doctorId=${doctorId}`
      );
      setSchedules(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        // The server's processed error (from axiosErrorHandler) is now in err.response
        const { status, data } = error.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
      }
    }
  }, [axiosInstance, doctorId]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const handleScheduleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSchedule = async () => {
    if (!validateSchedule()) return;
    try {
      if (editingScheduleId) {
        await axiosInstance.put(
          `${API_URL}?id=${editingScheduleId}`,
          newSchedule
        );
      } else {
        await axiosInstance.post(API_URL, newSchedule);
      }
      fetchSchedules();
      resetForm();
      setIsPopupVisible(false);
    } catch (error) {
      if (isAxiosError(error)) {
        // The server's processed error (from axiosErrorHandler) is now in err.response
        const { status, data } = error.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
      }
    }
  };

  const handleEditSchedule = (id: number) => {
    setEditingScheduleId(id);
    const scheduleToEdit = schedules.find((schedule) => schedule.id === id);
    if (scheduleToEdit) setNewSchedule(scheduleToEdit);
    setIsPopupVisible(true);
  };

  const handleRemoveSchedule = async (id: number) => {
    try {
      await axiosInstance.delete(`${API_URL}?id=${id}`);
      fetchSchedules();
    } catch (error) {
      if (isAxiosError(error)) {
        // The server's processed error (from axiosErrorHandler) is now in err.response
        const { status, data } = error.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
      }
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsPopupVisible(false);
  };

  const resetForm = () => {
    setEditingScheduleId(null);
    setNewSchedule({
      id: 0,
      day_of_week: "",
      start_time: "",
      end_time: "",
      notes: "",
      max_patients_per_slot: 0,
    });
    setErrors({});
  };

  const validateSchedule = () => {
    const formErrors: { [key: string]: string } = {};
    const today = new Date().setHours(0, 0, 0, 0); // Timestamp for today's date at midnight
    const selectedDate = new Date(newSchedule.day_of_week).getTime(); // Convert selected date to timestamp

    if (!newSchedule.day_of_week) {
      formErrors.day_of_week = t("schedule.errors.dayRequired");
    } else if (selectedDate < today) {
      formErrors.day_of_week = t("schedule.errors.invalidDate");
    }

    if (!newSchedule.start_time) {
      formErrors.start_time = t("schedule.errors.startTimeRequired");
    }

    if (!newSchedule.end_time) {
      formErrors.end_time = t("schedule.errors.endTimeRequired");
    } else if (newSchedule.start_time && newSchedule.end_time) {
      const startTime = newSchedule.start_time;
      const endTime = newSchedule.end_time;
      if (startTime >= endTime) {
        formErrors.start_time = t("schedule.errors.invalidTimeRange");
      }
    }

    if (
      newSchedule.max_patients_per_slot === undefined ||
      newSchedule.max_patients_per_slot === null
    ) {
      formErrors.max_patients_per_slot = t(
        "schedule.errors.maxPatientsRequired"
      );
    } else if (
      newSchedule.max_patients_per_slot < 1 ||
      newSchedule.max_patients_per_slot > 1000
    ) {
      formErrors.max_patients_per_slot = t(
        "schedule.errors.invalidMaxPatients"
      );
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return (
    <div className="space-y-6 relative">
      <h2 className="text-3xl font-semibold text-gray-800">
        {t("schedule.title")}
      </h2>
      <div className="space-y-6">
        {schedules.map((schedule) => (
          <Schedule
            key={schedule.id}
            schedule={schedule}
            onEdit={handleEditSchedule}
            onRemove={handleRemoveSchedule}
          />
        ))}
        <button
          onClick={() => setIsPopupVisible(true)}
          className="mt-4 px-6 py-2 bg-[#00bfa5] hover:bg-[#139485] transition text-white rounded"
        >
          {t("schedule.add")}
        </button>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingScheduleId ? t("schedule.edit") : t("schedule.add")}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="day" className="block text-gray-700 mb-1">
                  {t("schedule.day")}
                </label>
                <select
                  name="day_of_week"
                  value={newSchedule.day_of_week}
                  onChange={handleScheduleChange}
                  id="day"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                >
                  <option value="">{t("schedule.selectDay")}</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {t(`schedule.days.${day}`)}
                    </option>
                  ))}
                </select>
                {errors.day_of_week && (
                  <p className="text-red-500 text-sm">{errors.day_of_week}</p>
                )}
              </div>
              <div>
                <label htmlFor="startTime" className="block text-gray-700 mb-1">
                  {t("schedule.startTime")}
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={newSchedule.start_time}
                  onChange={handleScheduleChange}
                  id="startTime"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                />
                {errors.start_time && (
                  <p className="text-red-500 text-sm">{errors.start_time}</p>
                )}
              </div>
              <div>
                <label htmlFor="endTime" className="block text-gray-700 mb-1">
                  {t("schedule.endTime")}
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={newSchedule.end_time}
                  onChange={handleScheduleChange}
                  id="endTime"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                />
                {errors.end_time && (
                  <p className="text-red-500 text-sm">{errors.end_time}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="max_patients_per_slot"
                  className="block text-gray-700 mb-1"
                >
                  {t("schedule.maxPatients")}
                </label>
                <input
                  type="number"
                  name="max_patients_per_slot"
                  value={newSchedule.max_patients_per_slot}
                  onChange={handleScheduleChange}
                  min="0"
                  max="9223372036854776000"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                />
                {errors.max_patients_per_slot && (
                  <p className="text-red-500 text-sm">
                    {errors.max_patients_per_slot}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="notes" className="block text-gray-700 mb-1">
                  {t("schedule.notes")}
                </label>
                <textarea
                  name="notes"
                  value={newSchedule.notes || ""}
                  onChange={handleScheduleChange}
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4 rtl:space-x-reverse mt-6">
                <button
                  onClick={handleSaveSchedule}
                  className="px-4 py-2 bg-[#00bfa5] hover:bg-[#139485] transition text-white rounded-md"
                >
                  {editingScheduleId ? t("schedule.save") : t("schedule.add")}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                >
                  {t("schedule.cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;
