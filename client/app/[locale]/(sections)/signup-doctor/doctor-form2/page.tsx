"use client";
import React, { useState } from "react";
import Button from "@components/common/Button";
import { TFormErrors } from "@myTypes/FormDoctor";
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "@store/authDoctor/authDoctorSlice"; // Redux action
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RootState } from "@store/store";
import { useTranslations } from "next-intl";

const DoctorForm2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.doctorForm.formData);
  const [errors, setErrors] = useState<TFormErrors>({});

  // Load translations
  const t = useTranslations("doctorForm2");

  const validateForm = () => {
    const errors: TFormErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.highestDegree)
      errors.highestDegree = t("formFields.highestDegree.error");
    if (!formData.institutionName)
      errors.institutionName = t("formFields.institutionName.error");
    if (!formData.graduationYear) {
      errors.graduationYear = t("formFields.graduationYear.error");
    } else if (
      formData.graduationYear < 1900 ||
      formData.graduationYear > currentYear
    ) {
      errors.graduationYear = t("formFields.graduationYear.rangeError", {
        currentYear,
      });
    }

    return errors;
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      router.push("/signup-doctor/doctor-form3");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
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
            {t("title")}
          </h5>

          <motion.form
            className="bg-white relative p-6 md:w-3/4 mx-auto rounded-lg shadow-lg space-y-6 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="flex flex-col space-y-2 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.highestDegree.label")}
              </label>
              <select
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.highestDegree || ""}
                onChange={(e) =>
                  dispatch(setFormData({ highestDegree: e.target.value }))
                }
              >
                <option value="" disabled>
                  {t("formFields.highestDegree.placeholder")}
                </option>
                <option value="Bachelors">
                  {t("formFields.highestDegree.options.bachelors")}
                </option>
                <option value="Masters">
                  {t("formFields.highestDegree.options.masters")}
                </option>
                <option value="Doctoral">
                  {t("formFields.highestDegree.options.doctoral")}
                </option>
              </select>
              {errors.highestDegree && (
                <p className="text-red-500 text-start">
                  {errors.highestDegree}
                </p>
              )}
            </motion.div>

            <motion.div
              className="flex flex-col space-y-2 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.institutionName.label")}
              </label>
              <input
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                placeholder={t("formFields.institutionName.placeholder")}
                value={formData.institutionName || ""}
                onChange={(e) =>
                  dispatch(setFormData({ institutionName: e.target.value }))
                }
              />
              {errors.institutionName && (
                <p className="text-red-500 rtl:text-right ltr:text-left">
                  {errors.institutionName}
                </p>
              )}
            </motion.div>

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
                {t("formFields.graduationYear.label")}
              </label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                placeholder={t("formFields.graduationYear.placeholder")}
                value={formData.graduationYear || ""}
                onChange={(e) =>
                  dispatch(
                    setFormData({
                      graduationYear: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  )
                }
              />
              {errors.graduationYear && (
                <p className="text-red-500 rtl:text-right ltr:text-left">
                  {errors.graduationYear}
                </p>
              )}
            </motion.div>

            <div className="flex justify-between items-center text-2xl pt-5">
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
                  {t("navigation.back")}
                </Button>
              </motion.div>

              <motion.span
                className="text-[#686b72]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                {t("navigation.pageIndicator")}
              </motion.span>

              <motion.div
                initial={{ x: "250px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={handleNextClick}
              >
                <Button variant="secondary" size="large" roundedValue="full">
                  {t("navigation.next")}
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
