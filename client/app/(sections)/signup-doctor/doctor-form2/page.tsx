"use client";
import React, { useState } from "react";
import Button from "@components/common/Button";
import { TFormErrors } from "@app/types/FormDoctor";
import { useDoctorFormStore } from "@store/useDoctorFormStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const DoctorForm2 = () => {
  const router = useRouter();

  const { formData, setFormData } = useDoctorFormStore();
  const [errors, setErrors] = useState<TFormErrors>({});

  const validateForm = () => {
    const errors: TFormErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.highestDegree) errors.highestDegree = "Degree is required.";
    if (!formData.institutionName)
      errors.institutionName = "Institution name is required.";
    if (!formData.graduationYear) {
      errors.graduationYear = "Graduation year is required.";
    } else if (
      formData.graduationYear < 1900 ||
      formData.graduationYear > currentYear
    ) {
      errors.graduationYear = `Year must be between 1900 and ${currentYear}.`;
    }

    return errors;
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form data ready for submission:", formData);
      router.push("/signup-doctor/doctor-form3");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      {/* Educational Information Section with improved animation */}
      <motion.div
        className="relative py-10 px-8 md:px-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
          duration: 0.8,
        }}
      >
        <div className="container mx-auto">
          <h5 className="text-maintext text-3xl font-medium mb-7 text-center">
            Educational Information
          </h5>

          {/* Form Section with smooth animation */}
          <motion.form
            className="bg-white relative p-6 md:w-3/4 mx-auto rounded-lg shadow-lg space-y-6 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Highest Degree Earned Field with staggered animation */}
            <motion.div
              className="flex flex-col space-y-2 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                Highest Degree Earned
              </label>
              <select
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.highestDegree || ""}
                onChange={(e) => setFormData({ highestDegree: e.target.value })}
              >
                <option value="" disabled>
                  Select your degree
                </option>
                <option value="Bachelors">Bachelor&apos;s degree</option>
                <option value="Masters">Master&apos;s degree</option>
                <option value="Doctoral">Doctoral degree</option>
              </select>
              {errors.highestDegree && (
                <p className="text-red-500">{errors.highestDegree}</p>
              )}
            </motion.div>

            {/* Name of Institution Field with a subtle scaling animation */}
            <motion.div
              className="flex flex-col space-y-2 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                Name of Institution
              </label>
              <input
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                placeholder="Enter the name of your institution"
                value={formData.institutionName || ""}
                onChange={(e) =>
                  setFormData({ institutionName: e.target.value })
                }
              />
              {errors.institutionName && (
                <p className="text-red-500">{errors.institutionName}</p>
              )}
            </motion.div>

            {/* Year of Graduation Field with a slight scale and fade-in */}
            <motion.div
              className="flex flex-col space-y-2 w-full mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.3,
              }}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                Year of Graduation
              </label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                placeholder="Enter your graduation year"
                value={formData.graduationYear || ""}
                onChange={(e) =>
                  setFormData({
                    graduationYear: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  })
                }
              />
              {errors.graduationYear && (
                <p className="text-red-500">{errors.graduationYear}</p>
              )}
            </motion.div>

            {/* Buttons */}
            <div className="flex justify-between items-center text-2xl pt-5">
              {/* Back Button */}
              <motion.div
                initial={{ x: "-250px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  router.push("/signup-doctor/doctor-form1");
                }}
              >
                <Button variant="primary" size="large" roundedValue="full">
                  Back
                </Button>
              </motion.div>

              {/* Step Indicator */}
              <motion.span
                className="text-[#686b72]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                2/3
              </motion.span>

              {/* Next Button */}
              <motion.div
                initial={{ x: "250px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={handleNextClick}
              >
                <Button variant="secondary" size="large" roundedValue="full">
                  Next
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </>
  );
};

export default DoctorForm2;
