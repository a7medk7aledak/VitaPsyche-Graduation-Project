"use client"; // أضف هذه السطر في أعلى الملف

import { useParams } from "next/navigation";
import React from "react";

const TestPage: React.FC = () => {
  const params = useParams();
  const testName = params?.testName as string;
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {testName ? testName.replace(/-/g, " ") : "Loading..."}
        </h1>
        <p className="text-lg text-gray-600">
          This is the detailed page for the{" "}
          {testName ? testName.replace(/-/g, " ") : "test"}. Here you can start
          the test or see more information about it.
        </p>
        {/* Add more content for the test page here */}
      </div>
    </div> // Use type assertion to treat params as Params
  );
};

export default TestPage;
