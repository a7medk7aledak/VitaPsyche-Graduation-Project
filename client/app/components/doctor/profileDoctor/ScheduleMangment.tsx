"use client";
import React, { useState } from "react";
import Schedule from "./Schedule";

interface Schedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

const ScheduleManagement = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, day: "2025-01-01", startTime: "09:00", endTime: "17:00" },
    { id: 2, day: "2025-01-02", startTime: "10:00", endTime: "18:00" },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(
    null
  );
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    id: 0,
    day: "",
    startTime: "",
    endTime: "",
  });

  const handleScheduleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSchedule = () => {
    if (!validateSchedule()) return;
    if (editingScheduleId) {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editingScheduleId
            ? { ...schedule, ...newSchedule }
            : schedule
        )
      );
    } else {
      setSchedules((prev) => [
        ...prev,
        { ...newSchedule, id: prev.length + 1 },
      ]);
    }
    resetForm();
    setIsPopupVisible(false);
  };

  const handleEditSchedule = (id: number) => {
    setEditingScheduleId(id);
    const scheduleToEdit = schedules.find((schedule) => schedule.id === id);
    if (scheduleToEdit) setNewSchedule(scheduleToEdit);
    setIsPopupVisible(true);
  };

  const handleRemoveSchedule = (id: number) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
  };

  const handleCancel = () => {
    resetForm();
    setIsPopupVisible(false);
  };

  const resetForm = () => {
    setEditingScheduleId(null);
    setNewSchedule({ id: 0, day: "", startTime: "", endTime: "" });
    setErrors({});
  };

  const validateSchedule = () => {
    const formErrors: { [key: string]: string } = {};
    const today = new Date().setHours(0, 0, 0, 0); // Timestamp for today's date at midnight
    const selectedDate = new Date(newSchedule.day).getTime(); // Convert selected date to timestamp

    if (!newSchedule.day) {
      formErrors.day = "Day is required.";
    } else if (selectedDate < today) {
      formErrors.day = "Invalid date. Please select a future date.";
    }

    if (!newSchedule.startTime) {
      formErrors.startTime = "Start time is required.";
    }

    if (!newSchedule.endTime) {
      formErrors.endTime = "End time is required.";
    } else if (newSchedule.startTime && newSchedule.endTime) {
      // Compare times as strings in HH:MM format
      const startTime = newSchedule.startTime;
      const endTime = newSchedule.endTime;
      if (startTime >= endTime) {
        formErrors.startTime =
          "Start time cannot be later than or equal to end time.";
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return (
    <div className="space-y-6 relative">
      <h2 className="text-3xl font-semibold text-gray-800">Schedules</h2>
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
          Add Schedule
        </button>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingScheduleId ? "Edit Schedule" : "Add Schedule"}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="day" className="block text-gray-700 mb-1">
                  Day
                </label>
                <input
                  type="date"
                  name="day"
                  value={newSchedule.day}
                  onChange={handleScheduleChange}
                  id="day"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                />
                {errors.day && (
                  <p className="text-red-500 text-sm">{errors.day}</p>
                )}
              </div>
              <div>
                <label htmlFor="startTime" className="block text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={newSchedule.startTime}
                  onChange={handleScheduleChange}
                  id="startTime"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">{errors.startTime}</p>
                )}
              </div>
              <div>
                <label htmlFor="endTime" className="block text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={newSchedule.endTime}
                  onChange={handleScheduleChange}
                  id="endTime"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] transition duration-200"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">{errors.endTime}</p>
                )}
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleSaveSchedule}
                  className="px-4 py-2 bg-[#00bfa5] hover:bg-[#139485] transition text-white rounded-md"
                >
                  {editingScheduleId ? "Save" : "Add"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                >
                  Cancel
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
