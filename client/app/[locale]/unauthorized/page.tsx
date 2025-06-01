"use client";

import { useRouter } from "@/i18n/navigation";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "@components/common/Logo"; // Ensure the correct import path

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Logo and Project Name */}
      <div className="absolute scale-125 top-8  flex items-center space-x-2">
        <Logo />
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center space-y-6 mt-16"
      >
        {/* Animated Lock Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: 1, duration: 0.5, ease: "easeInOut" }}
          className="bg-red-500 text-white p-6 rounded-full shadow-lg relative"
        >
          <FaLock size={60} className="drop-shadow-lg" />
          <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-40"></div>
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900">Access Denied</h1>

        {/* Description */}
        <p className="text-lg text-gray-600 max-w-xl">
          You do not have permission to view this page. Please check your
          account role or contact support if you believe this is a mistake.
        </p>

        {/* Return Home Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="bg-[#00bfa5] hover:bg-[#139485] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
