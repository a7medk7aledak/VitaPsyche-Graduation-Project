"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@components/common/Button";
import { FileUpload } from "@components/FileUpload";
import React from "react";
import { TFormErrors } from "@myTypes/FormDoctor";
import { useRouter } from "@/i18n/navigation";
import SuccessfullModal from "@components/modals/SuccessfullModal";
import { setFormData, setShowModal } from "@store/authDoctor/authDoctorSlice";
import { RootState, useAppDispatch } from "@store/store";
import { actAuthDoctorRegister } from "@store/authDoctor/act/actAuthDoctorRegister";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const categories = [
  "Depression",
  "Addiction",
  "Psychosis",
  "Personality disorders",
  "Adjustment disorders",
  "Anxiety",
  "Eating disorders",
  "Sexual disorders",
  "Posttraumatic stress disorder",
  "Bipolar disorder",
  "Attention deficit hyperactivity",
  "Obsessive-compulsive",
  "schizophrenia",
  "Marriage counseling",
  "Behavioral and emotional disorders in children",
];

const DoctorForm3 = () => {
  const t = useTranslations("doctorForm3");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formData = useSelector((state: RootState) => state.doctorForm.formData); // Get the current form data from Redux
  const { status, error, showModal } = useSelector(
    (state: RootState) => state.doctorForm
  );

  const [workingInClinic, setWorkingInClinic] = useState(
    formData.workingInClinic
  );
  const [multipleQualifications, setMultipleQualifications] = useState("");

  const [errors, setErrors] = useState<TFormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleFileChange = (key: string, file: File | null) => {
    dispatch(setFormData({ [key]: file })); // Dispatch the file to Redux state
  };

  const validateForm = () => {
    const errors: TFormErrors = {};

    if (!formData.category) errors.category = t("errors.categoryRequired");
    if (!formData.specialization)
      errors.specialization = t("errors.specializationRequired");
    if (!formData.years_of_experience)
      errors.years_of_experience = t("errors.yearsOfExperienceRequired");

    if (!workingInClinic)
      errors.workingInClinic = t("errors.workingInClinicRequired");
    if (workingInClinic === "yes" && !formData.clinic_name)
      errors.clinic_name = t("errors.clinicNameRequired");

    if (!formData.availability_for_sessions)
      errors.availability_for_sessions = t("errors.availabilityRequired");

    if (!formData.cv) errors.cv = t("errors.cvRequired");
    if (!formData.certifications)
      errors.certifications = t("errors.certificationsRequired");

    if (!multipleQualifications)
      errors.multipleQualifications = t(
        "errors.multipleQualificationsRequired"
      );
    if (
      multipleQualifications === "yes" &&
      (!formData.another_qualification1 || !formData.another_qualification2)
    ) {
      errors.additionalQualifications = t(
        "errors.additionalQualificationsRequired"
      );
    }

    return errors;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const {
        username,
        first_name,
        last_name,
        email,
        password,
        password2,
        full_name_arabic,
        phone_number,
        birth_date,
        gender,
        specialization,
        prefix,
        nationality,
        fluent_languages,
        current_residence,
        clinic_name,
        years_of_experience,
        availability_for_sessions,
        cv,
        certifications,
        another_qualification1,
        another_qualification2,
      } = formData;

      await dispatch(
        actAuthDoctorRegister({
          username,
          first_name,
          last_name,
          email,
          password,
          password2,
          full_name_arabic,
          phone_number,
          birth_date,
          gender,
          specialization,
          prefix,
          nationality,
          fluent_languages,
          current_residence,
          clinic_name,
          years_of_experience,
          availability_for_sessions,
          cv,
          certifications,
          another_qualification1,
          another_qualification2,
        })
      );
    } else {
      setErrors(formErrors);
    }
  };

  const closeModalHandler = () => {
    dispatch(setShowModal(false));

    router.push("/signin");
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* professional information section */}
      <motion.div
        className="relative py-10 px-8 md:px-0"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={pageVariants}
      >
        {" "}
        <div className="container mx-auto">
          <motion.h5
            className="text-maintext text-3xl font-medium mb-7 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {" "}
            {t("professionalInformation")}
          </motion.h5>

          {/* formData */}
          <motion.form
            className="bg-white relative p-6 md:w-3/4 mx-auto rounded-lg shadow-lg space-y-6 mb-4"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            {/* category Field */}

            <motion.div
              className="flex flex-col space-y-2 w-full"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("category")}
              </label>
              <select
                name="category"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  {t("selectCategory")}
                </option>
                <option value="psychiatrist">{t("psychiatrist")}</option>
                <option value="clinical_psychologist">
                  {t("clinicalPsychologist")}
                </option>
                <option value="counseling_psychologist">
                  {t("counselingPsychologist")}
                </option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </motion.div>

            {/* Specialization Field */}
            <motion.div
              className="flex flex-col space-y-2 w-full"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("specialization")}
              </label>
              <select
                name="specialization"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.specialization}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  {t("selectSpecialization")}
                </option>
                {categories.map((cat, index) => (
                  <option value={cat} key={index}>
                    {t(`specializations.${cat}`)}
                  </option>
                ))}
              </select>
              {errors.specialization && (
                <p className="text-red-500 text-sm">{errors.specialization}</p>
              )}
            </motion.div>
            {/* Total Years Of Professional Experience Field */}
            <motion.div
              className="flex flex-col space-y-2 w-full"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("yearsOfExperience")}
              </label>

              <input
                name="years_of_experience"
                type="number"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.years_of_experience || ""}
                onChange={handleInputChange}
              />
              {errors.years_of_experience && (
                <p className="text-red-500 text-sm">
                  {errors.years_of_experience}
                </p>
              )}
            </motion.div>

            {/* License Number (If applicable) Field */}
            <motion.div
              className="flex flex-col space-y-2 w-full"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("licenseNumber")}
              </label>
              <input
                name="licenseNumber"
                placeholder={t("ifApplicable")}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.licenseNumber || ""}
                onChange={handleInputChange}
              />
            </motion.div>

            {/* licensing Organization Field */}
            <motion.div
              className="flex flex-col space-y-2 w-full"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("licensingOrganization")}
              </label>
              <input
                name="licensingOrganization"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.licensingOrganization || ""}
                onChange={handleInputChange}
              />
            </motion.div>

            {/* Working in a Clinic Field */}
            <motion.div
              className="flex flex-col space-y-2 w-full"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("workingInClinic")}
              </label>
              <select
                name="workingInClinic"
                required
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={workingInClinic}
                onChange={(e) => {
                  setWorkingInClinic(e.target.value);
                  handleInputChange(e);
                }}
              >
                <option value="" disabled>
                  {t("select")}
                </option>
                <option value="yes">{t("yes")}</option>
                <option value="no">{t("no")}</option>
              </select>
              {errors.workingInClinic && (
                <p className="text-red-500 text-sm">{errors.workingInClinic}</p>
              )}
            </motion.div>

            {/* Clinic Name Field */}
            {workingInClinic === "yes" && (
              <motion.div
                className="flex flex-col space-y-2 w-full mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <label className="text-xl font-medium text-[#1e256c]">
                  {t("clinicName")}
                </label>
                <input
                  name="clinic_name"
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 transition duration-200"
                  placeholder={t("ifWorkingInClinic")}
                  value={formData.clinic_name || ""}
                  onChange={handleInputChange}
                />
                {errors.clinic_name && (
                  <p className="text-red-500 text-sm">{errors.clinic_name}</p>
                )}
              </motion.div>
            )}

            {/* Availability for Sessions Field */}
            <motion.div
              className="flex flex-col space-y-2 w-full mb-10"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("availabilityForSessions")}
              </label>
              <select
                name="availability_for_sessions"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.availability_for_sessions.toString()}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  {t("selectAvailability")}
                </option>
                <option value="true">{t("yes")}</option>
                <option value="false">{t("no")}</option>
              </select>
              {errors.availability_for_sessions && (
                <p className="text-red-500 text-sm">
                  {errors.availability_for_sessions}
                </p>
              )}
            </motion.div>

            {/* Upload CV Field */}
            <div>
              <FileUpload
                existingFile={formData.cv}
                label={t("uploadCv")}
                acceptedFileTypes=".pdf,.doc,.docx"
                onFileChange={(file) => handleFileChange("cv", file)}
              />
              {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
            </div>

            {/* Upload Professional qualifications and educational certifications Field */}

            <div>
              <FileUpload
                existingFile={formData.certifications}
                label={t("uploadQualifications")}
                acceptedFileTypes=".pdf,.doc,.docx"
                onFileChange={(file) =>
                  handleFileChange("certifications", file)
                }
              />
              {errors.certifications && (
                <p className="text-red-500 text-sm">{errors.certifications}</p>
              )}
            </div>

            {/* Do You Have More than One professional qualifications Field */}

            <motion.div
              className="flex flex-col space-y-2 w-full mb-10"
              variants={formVariants}
            >
              <label className="text-xl font-medium text-[#1e256c]">
                {t("haveMultipleQualifications")}
              </label>
              <select
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={multipleQualifications}
                onChange={(e) => setMultipleQualifications(e.target.value)}
              >
                <option value="" disabled>
                  {t("select")}
                </option>
                <option value="yes">{t("yes")}</option>
                <option value="no">{t("no")}</option>
              </select>{" "}
              {errors.multipleQualifications && (
                <p className="text-red-500 text-sm">
                  {errors.multipleQualifications}
                </p>
              )}
            </motion.div>

            {/* If you possess multiple professional qualifications Field */}
            {multipleQualifications === "yes" && (
              <div>
                <FileUpload
                  existingFile={formData.another_qualification1 || null}
                  label={t("ifMultipleQualifications")}
                  acceptedFileTypes=".pdf,.doc,.docx"
                  onFileChange={(file) =>
                    handleFileChange("another_qualification1", file)
                  }
                />
                <FileUpload
                  existingFile={formData.another_qualification2 || null}
                  label=""
                  acceptedFileTypes=".pdf,.doc,.docx"
                  onFileChange={(file) =>
                    handleFileChange("another_qualification2", file)
                  }
                />
                {errors.additionalQualifications && (
                  <p className="text-red-500 text-sm">
                    {errors.additionalQualifications}
                  </p>
                )}
              </div>
            )}
            {/* Buttons */}
            <div className="flex justify-between items-center text-2xl pt-5">
              {/* Back Button */}
              <motion.div
                initial={{ x: "-250px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  router.push("/signup-doctor/doctor-form2");
                }}
              >
                <Button variant="primary" size="large" roundedValue="full">
                  {t("back")}
                </Button>
              </motion.div>

              {/* Step Indicator */}
              <motion.span
                className="text-[#686b72]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                3/3
              </motion.span>

              {/* Next Button */}
              <motion.div
                initial={{ x: "250px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={handleSubmit}
              >
                <Button variant="secondary" size="large" roundedValue="full">
                  {status == "pending" ? t("loading") : t("submit")}
                </Button>
              </motion.div>
            </div>
            {error && <p className="text-[#DC3545] mt-6 text-right">{error}</p>}
          </motion.form>
        </div>
      </motion.div>
      {/* Modal Component */}
      <SuccessfullModal
        isOpen={showModal}
        onClose={closeModalHandler}
        img="/images/signup-doctor/submissionModal.png"
        message={t("registrationSuccess")}
        isTransaction={false}
      />
    </>
  );
};

export default DoctorForm3;
