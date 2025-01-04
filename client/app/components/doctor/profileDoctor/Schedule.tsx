import React from "react";

interface ScheduleProps {
  schedule: {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
  };
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, onEdit, onRemove }) => {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800">
            {schedule.day}
          </h3>
          <p className="text-gray-600">
            <span className="font-semibold">Start Time:</span>{" "}
            {schedule.startTime}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">End Time:</span> {schedule.endTime}
          </p>
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
