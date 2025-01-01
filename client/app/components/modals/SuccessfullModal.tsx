import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

interface SuccessfullModalProps {
  isOpen: boolean;
  onClose: () => void;
  img: string;
  message?: string;
}

const SuccessfullModal: React.FC<SuccessfullModalProps> = ({
  isOpen,
  onClose,
  img,
  message,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-[#daf4f1] p-8 rounded-lg w-full mx-3 md:w-1/2 md:mx-0 lg:w-2/5 flex flex-col items-center space-y-8"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6,
        }}
      >
        {/* Loading Animation */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center"
          >
            {/* Larger React Icon Spinner with a slow to fast rotation */}
            <FaSpinner
              className="text-[#00978c] text-9xl animate-spin-smooth"
              style={{
                animationDuration: "3s", // Slow initial rotation
                animationTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)", // Smooth easing
              }}
            />
            <motion.p
              className="text-lg font-medium mt-4 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Processing your payment, please wait...
            </motion.p>
          </motion.div>
        ) : (
          <>
            {/* Image Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 90 }}
              animate={{
                opacity: 1,
                scale: 1.1,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                },
              }}
            >
              <Image
                src={img}
                alt="submissionModal.png"
                width={200}
                height={200}
              />
            </motion.div>

            {/* Message Animation */}
            <motion.h2
              className="text-2xl font-semibold mb-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1.05,
                transition: {
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                },
              }}
            >
              {message || "Payment has been successfully completed. Thank you!"}
            </motion.h2>

            {/* Close Button Animation */}
            <motion.div
              className="mt-4 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <button
                onClick={onClose}
                className="px-6 py-2 bg-subbutton text-white text-xl rounded-lg hover:bg-hoversubbutton transition-all"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SuccessfullModal;
