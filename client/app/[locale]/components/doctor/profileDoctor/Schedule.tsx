import React from "react";
import { capitalizeFirstLetter } from "./ScheduleMangment";
import { IAvailability } from "@myTypes/appointments";

interface ScheduleProps {
  schedule: IAvailability;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

export const formatTo12Hour = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

const Schedule: React.FC<ScheduleProps> = ({ schedule, onEdit, onRemove }) => {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800">
            {capitalizeFirstLetter(schedule.day_of_week)}
          </h3>
          <p className="text-gray-600">
            <span className="font-semibold">Start Time:</span>{" "}
            {formatTo12Hour(schedule.start_time)}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">End Time:</span>{" "}
            {formatTo12Hour(schedule.end_time)}
          </p>
          {schedule.max_patients_per_slot && (
            <p className="text-gray-600">
              <span className="font-semibold">Max Patients: </span>
              {schedule.max_patients_per_slot}
            </p>
          )}
          {schedule.notes && (
            <p className="text-gray-600 capitalize">
              <span className="font-semibold ">Notes: </span>
              {schedule.notes}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onEdit(schedule.id)}
            className="text-white py-2 px-4 rounded-lg bg-[#00bfa5] hover:bg-[#139485] transition"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(schedule.id)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
