import React from "react";

const SpinnerLoading = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#0f766e] border-solid"></div>
        <p className="mt-4 text-gray-700 text-lg font-medium">{message} </p>
      </div>
    </div>
  );
};

export default SpinnerLoading;
