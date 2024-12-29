"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import { countries } from "@app/constants/countries";
import Button from "@components/common/Button";
import Heading from "@components/common/Heading";
import Image from "next/image";
import React, { useState, useId } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select, { MultiValue } from "react-select";
import { useRouter } from "next/navigation";
import { customStylesForLanguageInput } from "./customStyles";
import { TFormErrors } from "@app/types/FormDoctor";
import { languageOptions, OptionType } from "@constants/doctorLanguages";
import { RootState } from "@store/store";
import { setFormData, setLanguages } from "@store/doctorFormSlice";

const DoctorForm1 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.doctorForm);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<TFormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleLanguageChange = (selected: MultiValue<OptionType>) => {
    const selectedLanguages = selected.map((option) => option.value);
    dispatch(setLanguages(selectedLanguages));
  };

  const validateForm = (): TFormErrors => {
    const errors: TFormErrors = {};
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password regex (min 8 chars, 1 letter, 1 number, 1 special char)

    if (!formData.fullNameEnglish)
      errors.fullNameEnglish = "Full name (English) is required.";
    if (!formData.fullNameArabic)
      errors.fullNameArabic = "Full name (Arabic) is required.";
    if (!formData.prefix) errors.prefix = "Prefix is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!regexEmail.test(formData.email)) {
      errors.email = "Email format is invalid.";
    }
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.username) errors.username = "Username is required.";

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!regexPassword.test(formData.password)) {
      errors.password =
        "Password must contain at least one letter, one number, and one special character.";
    }

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    if (!formData.dateOfBirth)
      errors.dateOfBirth = "Date of birth is required.";
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.nationality) errors.nationality = "Nationality is required.";
    if (!formData.countryOfResidence)
      errors.countryOfResidence = "Country of residence is required.";
    if (!formData.fluentLanguages.length)
      errors.fluentLanguages = "At least one language must be selected.";

    return errors;
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form data ready for submission:", formData);
      router.push("/signup-doctor/doctor-form2");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="relative py-12"
      >
        {" "}
        <div className="container mx-auto">
          <div className="-mb-10">
            <Heading variant="secondary">
              Join as a Therapist Form{" "}
              <hr className="w-full absolute left-0 border-1 border-slate-500 mt-7 " />
            </Heading>
          </div>
          {/* content */}
          <div className="flex flex-col lg:flex-row-reverse justify-between ">
            {/* Image content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto lg:mx-0 mb-7 lg:mb-0"
            >
              <Image
                src={"/images/signup-doctor/doctorForm1.png"}
                width={600}
                height={600}
                alt="doctorForm1.png"
                className="max-w-full"
              />
            </motion.div>
            {/* Image content */}
            {/* text content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 px-2 lg:px-0"
            >
              {" "}
              <h5 className="text-maintext text-3xl font-medium mb-3">
                Required Criteria For Each Category:
              </h5>
              {/* the lists */}
              <div className="space-y-4">
                {/* list-1 */}
                <div>
                  <h4 className="text-2xl mb-2">For Clinical Psychologists:</h4>
                  <ul className="list-decimal ml-8 space-y-1 text-xl">
                    <li>
                      Master&apos;s of Science or Arts (MSc/MA) in Clinical
                      Psychology.
                    </li>
                    <li>Five Years of clinical experience</li>
                    <li>Proof of supervision document.</li>
                  </ul>
                </div>
                {/* list-2 */}
                <div>
                  <h4 className="text-2xl mb-3">
                    For Counseling Psychologists:
                  </h4>
                  <ul className="list-decimal ml-8 space-y-1 text-xl">
                    <li>
                      Masters of Science or Arts (MSc/MA) in Counseling
                      Psychology.
                    </li>
                    <li>Five years of counseling experience.</li>
                    <li>Proof of supervision document.</li>
                  </ul>
                </div>
                {/* list-3 */}
                <div>
                  <h4 className="text-2xl mb-3">For Psychiatrists:</h4>
                  <ul className="list-decimal ml-8 space-y-1 text-xl">
                    <li>Graduation certificate.</li>
                    <li>Practice license.</li>
                    <li>Medical syndicate rank certificate.</li>
                    <li>Postgraduate certificate &quot;MSc or PhD&quot;</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            {/* text content */}
          </div>
          {/* content */}
          <hr className="w-full absolute left-0 border-1 border-slate-500 mt-7" />
        </div>
      </motion.div>

      {/* personal information section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative pt-3 pb-10 px-5 md:px-0"
      >
        {" "}
        <div className="container mx-auto">
          <h5 className="text-maintext text-3xl font-medium mb-7 ">
            Personal Information
          </h5>

          {/* formData */}
          <form className="bg-white p-6 md:w-3/4 mx-auto rounded-lg shadow-lg space-y-6 mb-4">
            {/* Full Name Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <label className="text-xl font-medium text-[#1e256c]">
                  Full Name (in English)
                </label>
                <input
                  name="fullNameEnglish"
                  value={formData.fullNameEnglish}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder="John Doe"
                />
                {errors.fullNameEnglish && (
                  <span className="text-red-600 text-sm">
                    {errors.fullNameEnglish}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <label className="text-xl font-medium text-[#1e256c]">
                  Full Name (in Arabic)
                </label>
                <input
                  name="fullNameArabic"
                  value={formData.fullNameArabic}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 outline-none  rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder="جون دو"
                />
                {errors.fullNameArabic && (
                  <span className="text-red-600 text-sm">
                    {errors.fullNameArabic}
                  </span>
                )}
              </div>
            </div>

            {/* Prefix Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Prefix
              </label>
              <input
                name="prefix"
                value={formData.prefix}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                placeholder="Dr, Ms, Mrs, Mr, Prof"
              />
              {errors.prefix && (
                <span className="text-red-600 text-sm">{errors.prefix}</span>
              )}
            </div>

            {/* Email Address Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2  transition duration-200"
                placeholder="joe.doe@example.com"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">{errors.email}</span>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Phone Number
              </label>
              <PhoneInput
                country={"eg"}
                value={formData.phone}
                onChange={(phone) => dispatch(setFormData({ phone }))}
                placeholder="Enter phone number"
                containerStyle={{ width: "100%" }}
                inputStyle={{
                  width: "100%",
                  paddingLeft: "50px",
                  height: "48px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                buttonStyle={{
                  borderRadius: "8px 0 0 8px",
                  borderRight: "1px solid #ccc",
                  backgroundColor: "transparent",
                  padding: "2px",
                }}
              />
              {errors.phone && (
                <span className="text-red-600 text-sm">{errors.phone}</span>
              )}
            </div>

            {/* Username Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Username
              </label>
              <input
                name="username"
                placeholder="johndoe123"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              />
              {errors.username && (
                <span className="text-red-600 text-sm">{errors.username}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-600 text-sm">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-600 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                type="date"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              />
              {errors.dateOfBirth && (
                <span className="text-red-600 text-sm">
                  {errors.dateOfBirth}
                </span>
              )}
            </div>

            {/* Gender Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-600 text-sm">{errors.gender}</span>
              )}
            </div>

            {/* Nationality Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Nationality
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              >
                <option disabled value="">
                  Select nationality
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.nationality && (
                <span className="text-red-600 text-sm">
                  {errors.nationality}
                </span>
              )}
            </div>

            {/* Country of Residence Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                Country of Residence
              </label>
              <select
                name="countryOfResidence"
                value={formData.countryOfResidence}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              >
                <option disabled value="">
                  Select country
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.countryOfResidence && (
                <span className="text-red-600 text-sm">
                  {errors.countryOfResidence}
                </span>
              )}
            </div>

            {/* Fluent Languages Field */}
            <div className="flex flex-col space-y-2 w-full mb-10">
              <label className="text-xl font-medium text-[#1e256c]">
                Fluent Languages
              </label>
              <Select
                name="fluentLanguages"
                instanceId={useId()}
                isMulti
                options={languageOptions}
                value={languageOptions.filter((option) =>
                  formData.fluentLanguages.includes(option.value)
                )}
                onChange={handleLanguageChange}
                placeholder="List languages you are fluent in"
                styles={customStylesForLanguageInput}
              />
              {errors.fluentLanguages && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.fluentLanguages}
                </p>
              )}
            </div>

            {/* Next Button */}
            <div className="flex justify-end  items-center gap-x-2 text-2xl pt-5">
              <span className="text-[#686b72]">1/3</span>
              <div onClick={handleNextClick}>
                <Button variant="secondary" size="large" roundedValue="full">
                  Next
                </Button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default DoctorForm1;
