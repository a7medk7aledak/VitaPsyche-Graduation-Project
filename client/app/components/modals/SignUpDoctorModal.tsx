// components/Modal.tsx
import Image from "next/image";
import React from "react";

interface SignUpDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const SignUpDoctorModal: React.FC<SignUpDoctorModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#daf4f1] p-8 rounded-lg w-1/2 lg:w-2/5 flex flex-col items-center space-y-8">
        <Image
          src={"/images/signup-doctor/submissionModal.png"}
          alt="submissionModal.png"
          width={200}
          height={200}
        />
        <h2 className="text-2xl font-semibold mb-4 ">{message} </h2>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-subbutton text-white text-xl rounded-lg hover:bg-hoversubbutton"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpDoctorModal;
