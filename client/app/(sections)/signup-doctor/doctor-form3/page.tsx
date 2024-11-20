"use client";

import { useState } from "react";
import Button from "@components/common/Button";
import { FileUpload } from "@components/FileUpload";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { specializations } from "@constants/specializations";
import { useDoctorFormStore } from "@store/useDoctorFormStore";
import { TFormErrors } from "@app/types/FormDoctor";
import SignUpDoctorModal from "@components/modals/SignUpDoctorModal";
import { useRouter } from "next/navigation";

const DoctorForm3 = () => {
  const router = useRouter();

  const { formData, setFormData } = useDoctorFormStore();

  const [workingInClinic, setWorkingInClinic] = useState("");

  const [multipleQualifications, setMultipleQualifications] = useState("");
  // State to store all files
  // const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const [errors, setErrors] = useState<TFormErrors>({});

  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleFileChange = (key: string, file: File | null) => {
    // setFiles((prevFiles) => ({
    //   ...prevFiles,
    //   [key]: file,
    // }));
    setFormData({ [key]: file });

    // console.log(files);
  };

  // Validate form fields
  const validateForm = () => {
    const errors: TFormErrors = {};

    if (!formData.category) errors.category = "Category is required.";
    if (!formData.specialization)
      errors.specialization = "Specialization is required.";
    if (!formData.yearsOfExperience)
      errors.yearsOfExperience = "Years of experience is required.";

    if (!workingInClinic)
      errors.workingInClinic =
        "Please select if you are working in a clinic or not.";
    if (workingInClinic === "yes" && !formData.clinicName)
      errors.clinicName = "Clinic name is required if you have selected yes.";

    if (!formData.availabilityForSessions)
      errors.availabilityForSessions = "Availability for sessions is required.";

    if (!formData.cv) errors.cv = "CV upload is required.";
    if (!formData.certifications)
      errors.certifications = "Certifications upload is required.";

    if (!multipleQualifications)
      errors.multipleQualifications =
        "Please specify if you have multiple qualifications.";
    if (
      multipleQualifications === "yes" &&
      (!formData.anotherQualification1 || !formData.anotherQualification2)
    ) {
      errors.additionalQualifications =
        "additional qualifications must be uploaded if you have selected yes.";
    }

    return errors; // Valid if no errors
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setShowModal(true);
      console.log("Form data ready for submission:", formData);
    } else {
      setErrors(formErrors);
    }
  };

  const closeModalHandler = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <>
      {/* personal information section */}
      <div className="relative py-10 px-8 md:px-0">
        <div className="container mx-auto">
          <h5 className="text-maintext text-3xl font-medium mb-7 text-center">
            Professional Information
          </h5>

          {/* formData */}
          <form className="bg-white relative p-6 md:w-3/4 mx-auto rounded-lg shadow-lg space-y-6 mb-4 ">
            {/* Back Button */}
            <Link
              href="/signup-doctor/doctor-form2"
              className="flex items-center justify-center absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#8fd3d1] text-white rounded-full py-2 pr-2 md:pr-4 shadow-md hover:bg-[#6ab7a9] transition duration-200 text-md md:text-2xl"
            >
              <IoIosArrowBack className="text-lg md:text-3xl" />
              <span>Back</span>
            </Link>

            {/* category Field */}

            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Category
              </label>
              <select className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200">
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="psychiatrist">Psychiatrist</option>
                <option value="clinical_psychologist">
                  Clinical Psychologist
                </option>
                <option value="counseling_psychologist">
                  Counseling Psychologist
                </option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Specialization Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Specialization
              </label>
              <select
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ specialization: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Specialization
                </option>
                {specializations.map((spec, index) => (
                  <option value={spec} key={index}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialization && (
                <p className="text-red-500 text-sm">{errors.specialization}</p>
              )}
            </div>

            {/* Total Years Of Professional Experience Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Total Years Of Professional Experience{" "}
              </label>

              <input
                type="number"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.yearsOfExperience || ""}
                onChange={(e) =>
                  setFormData({
                    yearsOfExperience: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  })
                }
              />
              {errors.yearsOfExperience && (
                <p className="text-red-500 text-sm">
                  {errors.yearsOfExperience}
                </p>
              )}
            </div>

            {/* License Number (If applicable) Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                License Number (If applicable)
              </label>
              <input
                placeholder="if applicable"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.licenseNumber || ""}
                onChange={(e) =>
                  setFormData({
                    licenseNumber: e.target.value,
                  })
                }
              />
            </div>

            {/* licensing Organization Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                licensing Organization{" "}
              </label>
              <input
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.licensingOrganization || ""}
                onChange={(e) =>
                  setFormData({
                    licensingOrganization: e.target.value,
                  })
                }
              />
            </div>

            {/* Working in a Clinic Field */}
            <div className="flex flex-col space-y-2 w-full mb-10">
              <label className="text-xl font-medium text-[#1e256c]">
                Working in a clinic
              </label>
              <select
                required
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={workingInClinic}
                onChange={(e) => setWorkingInClinic(e.target.value)}
              >
                <option value="" disabled>
                  select
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.workingInClinic && (
                <p className="text-red-500 text-sm">{errors.workingInClinic}</p>
              )}
            </div>

            {/* Clinic Name Field */}
            {workingInClinic === "yes" && (
              <div className="flex flex-col space-y-2 w-full mb-10">
                <label className="text-xl font-medium text-[#1e256c]">
                  Clinic Name
                </label>
                <input
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 transition duration-200 "
                  placeholder="if you are working in a clinic"
                  value={formData.clinicName || ""}
                  onChange={(e) =>
                    setFormData({
                      clinicName: e.target.value,
                    })
                  }
                />
                {errors.clinicName && (
                  <p className="text-red-500 text-sm">{errors.clinicName}</p>
                )}
              </div>
            )}

            {/* Availability for Sessions Field */}
            <div className="flex flex-col space-y-2 w-full mb-10">
              <label className="text-xl font-medium text-[#1e256c]">
                Availability for Sessions
              </label>
              <select
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={formData.availabilityForSessions || ""}
                onChange={(e) =>
                  setFormData({
                    availabilityForSessions: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select availability
                </option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both</option>
              </select>
              {errors.availabilityForSessions && (
                <p className="text-red-500 text-sm">
                  {errors.availabilityForSessions}
                </p>
              )}
            </div>

            {/* Upload CV Field */}
            <div>
              <FileUpload
                label="Upload Cv"
                acceptedFileTypes=".pdf,.doc,.docx"
                onFileChange={(file) => handleFileChange("cv", file)}
              />
              {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
            </div>

            {/* Upload Professional qualifications and educational certifications Field */}

            <div>
              <FileUpload
                label="Upload Professional qualifications and educational certifications"
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

            <div className="flex flex-col space-y-2 w-full mb-10">
              <label className="text-xl font-medium text-[#1e256c]">
                Do You Have More than One professional qualifications
                certifications
              </label>
              <select
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                value={multipleQualifications}
                onChange={(e) => setMultipleQualifications(e.target.value)}
              >
                <option value="" disabled>
                  select
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>{" "}
              {errors.multipleQualifications && (
                <p className="text-red-500 text-sm">
                  {errors.multipleQualifications}
                </p>
              )}
            </div>

            {/* If you possess multiple professional qualifications Field */}
            {multipleQualifications === "yes" && (
              <div>
                <FileUpload
                  label="If you possess multiple professional qualifications."
                  acceptedFileTypes=".pdf,.doc,.docx"
                  onFileChange={(file) =>
                    handleFileChange("anotherQualification1", file)
                  }
                />
                <FileUpload
                  label=""
                  acceptedFileTypes=".pdf,.doc,.docx"
                  onFileChange={(file) =>
                    handleFileChange("anotherQualification2", file)
                  }
                />
                {errors.additionalQualifications && (
                  <p className="text-red-500 text-sm">
                    {errors.additionalQualifications}
                  </p>
                )}
              </div>
            )}
            {/* Submit button */}
            <div className="flex justify-end  items-center gap-x-2 text-2xl pt-5">
              <span className="text-[#686b72]">3/3</span>
              <div onClick={handleSubmit}>
                <Button variant="secondary" size="large" roundedValue="full">
                  submit
                </Button>
              </div>
            </div>
          </form>
        </div>
        {/* Modal Component */}
        <SignUpDoctorModal
          isOpen={showModal}
          onClose={closeModalHandler}
          message="Thanks For Completing This Form !"
        />
      </div>
    </>
  );
};

export default DoctorForm3;
