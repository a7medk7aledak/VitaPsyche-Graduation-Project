import React, { memo } from "react";

interface IInterestsProps {
  category: string;
}

// Create the base component function
function InterestsBase({ category }: IInterestsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Interests
      </h2>
      <div className="flex flex-wrap gap-2">
        <span
          className={`px-4 py-2 rounded-full text-md bg-teal-100 text-teal-800`}
        >
          {category}
        </span>
      </div>
    </div>
  );
}

// Export the memoized version of the component
export const Interests = memo(InterestsBase);
Interests.displayName = "Interests";
