import { useCategoryLookup } from "@utils/categoryLookup";
import Image from "next/image";
import React from "react";

interface IServiceComponentProps {
  service: {
    id: number;
    name: string;
    category: number;
    price: string;
    duration: string;
    description?: string;
    is_active?: boolean;
    doctors?: string[];
    image?: string | File; // Only string for displayed services
  };
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const Service: React.FC<IServiceComponentProps> = ({
  service,
  onEdit,
  onRemove,
}) => {
  const getCategory = useCategoryLookup();
  const categoryName = getCategory(service.category);

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        {/* Image Section */}
        {service.image && (
          <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
            <Image
              src={service.image as string}
              alt={service.name}
              width={128}
              height={128}
              quality={100} // Ensure best quality
              unoptimized // Prevents Next.js from compressing the image
              className="rounded-md border object-cover w-full h-full"
            />
          </div>
        )}
        {/* Service Details */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 capitalize">
            {service.name}
          </h3>
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {categoryName}
          </p>
          {service.description && (
            <p className="text-gray-600 capitalize">
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

        {/* Action Buttons */}
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
