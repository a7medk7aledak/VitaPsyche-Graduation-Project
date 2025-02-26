import { useCategoryLookup } from "@utils/categoryLookup";
import React from "react";

interface ServiceProps {
  service: {
    id: number;
    name: string;
    category: number;
    price: string;
    duration: string;
    description?: string;
    is_active?: boolean;
    doctors?: string[];
  };
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const Service: React.FC<ServiceProps> = ({ service, onEdit, onRemove }) => {
  const getCategory = useCategoryLookup();
  const categoryName = getCategory(service.category);

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800">
            {service.name}
          </h3>
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {categoryName}
          </p>
          {service.description && (
            <p className="text-gray-600">
              <span className="font-semibold">Description:</span>{" "}
              {service.description}
            </p>
          )}
          <p className="text-gray-600">
            <span className="font-semibold">Price:</span> ${service.price}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Duration:</span> {service.duration}{" "}
            mins
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            {service.is_active ? (
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded font-medium">
                Active
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded font-medium">
                Inactive
              </span>
            )}{" "}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onEdit(service.id)}
            className="text-white py-2 px-4 rounded-lg bg-[#00bfa5] hover:bg-[#139485] transition"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(service.id)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
