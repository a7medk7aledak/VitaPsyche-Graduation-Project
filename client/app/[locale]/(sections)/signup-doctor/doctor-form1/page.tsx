"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

import { countries } from "@app/constants/countries";
import Button from "@components/common/Button";
import Heading from "@components/common/Heading";
import Image from "next/image";
import React, { useState, useId } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select, { MultiValue } from "react-select";
import { useRouter } from "@/i18n/navigation";
import { customStylesForLanguageInput } from "./customStyles";
import { TFormErrors } from "@myTypes/FormDoctor";
import { languageOptions, OptionType } from "@constants/doctorLanguages";
import { RootState } from "@store/store";
import { setFormData, setLanguages } from "@store/authDoctor/authDoctorSlice";

const DoctorForm1 = () => {
  const t = useTranslations("doctorForm1");
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.doctorForm.formData);
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
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.first_name)
      errors.first_name = t("formFields.firstName.error");
    if (!formData.last_name) errors.last_name = t("formFields.lastName.error");
    if (!formData.full_name_arabic)
      errors.full_name_arabic = t("formFields.fullNameArabic.error");
    if (!formData.prefix) errors.prefix = t("formFields.prefix.error");
    if (!formData.email) {
      errors.email = t("formFields.email.error");
    } else if (!regexEmail.test(formData.email)) {
      errors.email = t("formFields.email.invalidError");
    }
    if (!formData.phone_number)
      errors.phone_number = t("formFields.phoneNumber.error");
    if (!formData.username) errors.username = t("formFields.username.error");

    // Password validation
    if (!formData.password) {
      errors.password = t("formFields.password.error");
    } else if (formData.password.length < 8) {
      errors.password = t("formFields.password.lengthError");
    } else if (!regexPassword.test(formData.password)) {
      errors.password = t("formFields.password.formatError");
    }

    if (formData.password !== formData.password2)
      errors.password2 = t("formFields.confirmPassword.error");

    if (!formData.birth_date)
      errors.birth_date = t("formFields.birthDate.error");
    if (!formData.gender) errors.gender = t("formFields.gender.error");
    if (!formData.nationality)
      errors.nationality = t("formFields.nationality.error");
    if (!formData.current_residence)
      errors.current_residence = t("formFields.currentResidence.error");
    if (!formData.fluent_languages.length)
      errors.fluent_languages = t("formFields.fluentLanguages.error");

    return errors;
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
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
              {t("joinAsTherapist")}
              <hr className="w-full absolute start-0 border-1 border-slate-500 mt-7 " />
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
                {t("requiredCriteria")}
              </h5>
              {/* the lists */}
              <div className="space-y-4">
                {/* list-1 */}
                <div>
                  <h4 className="text-2xl mb-2">
                    {t("clinicalPsychologists.title")}
                  </h4>
                  <ul className="list-decimal ms-8 space-y-1 text-xl">
                    {t
                      .raw("clinicalPsychologists.requirements")
                      .map((requirement: string, index: number) => (
                        <li key={index}>{requirement}</li>
                      ))}
                  </ul>
                </div>
                {/* list-2 */}
                <div>
                  <h4 className="text-2xl mb-3">
                    {t("counselingPsychologists.title")}
                  </h4>
                  <ul className="list-decimal ms-8 space-y-1 text-xl">
                    {t
                      .raw("counselingPsychologists.requirements")
                      .map((requirement: string, index: number) => (
                        <li key={index}>{requirement}</li>
                      ))}
                  </ul>
                </div>
                {/* list-3 */}
                <div>
                  <h4 className="text-2xl mb-3">{t("psychiatrists.title")}</h4>
                  <ul className="list-decimal ms-8 space-y-1 text-xl">
                    {t
                      .raw("psychiatrists.requirements")
                      .map((requirement: string, index: number) => (
                        <li key={index}>{requirement}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            {/* text content */}
          </div>
          {/* content */}
          <hr className="w-full absolute start-0 border-1 border-slate-500 mt-7" />
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
            {t("personalInformation")}
          </h5>

          {/* formData */}
          <form className="bg-white p-6 md:w-3/4 mx-auto rounded-lg shadow-lg space-y-6 mb-4">
            {/* Full Name Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* First Name Field */}
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <label className="text-xl font-medium text-[#1e256c]">
                  {t("formFields.firstName.label")}
                </label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder={t("formFields.firstName.placeholder")}
                />
                {errors.first_name && (
                  <span className="text-red-600 text-sm">
                    {errors.first_name}
                  </span>
                )}
              </div>
              {/* Last Name Field */}
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <label className="text-xl font-medium text-[#1e256c]">
                  {t("formFields.lastName.label")}
                </label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder={t("formFields.lastName.placeholder")}
                />
                {errors.last_name && (
                  <span className="text-red-600 text-sm">
                    {errors.last_name}
                  </span>
                )}
              </div>
            </div>

            {/* Full Name in Arabic Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.fullNameArabic.label")}
              </label>
              <input
                name="full_name_arabic"
                value={formData.full_name_arabic}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                placeholder={t("formFields.fullNameArabic.placeholder")}
              />
              {errors.full_name_arabic && (
                <span className="text-red-600 text-sm">
                  {errors.full_name_arabic}
                </span>
              )}
            </div>

            {/* Prefix Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.prefix.label")}
              </label>
              <input
                name="prefix"
                value={formData.prefix}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                placeholder={t("formFields.prefix.placeholder")}
              />
              {errors.prefix && (
                <span className="text-red-600 text-sm">{errors.prefix}</span>
              )}
            </div>

            {/* Email Address Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.email.label")}
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2  transition duration-200"
                placeholder={t("formFields.email.placeholder")}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">{errors.email}</span>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.phoneNumber.label")}
              </label>

              {/* 
    Force LTR direction for phone input - this is important because 
    phone numbers are always LTR regardless of language
  */}
              <div className="relative w-full" dir="ltr">
                <PhoneInput
                  country={"eg"}
                  value={formData.phone_number}
                  onChange={(phone_number) =>
                    dispatch(setFormData({ phone_number }))
                  }
                  placeholder={t("formFields.phoneNumber.placeholder")}
                  enableSearch={true}
                  // Minimal inline styles that are needed for the component to function properly
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
                  specialLabel=""
                />
              </div>

              {/* Error message with RTL/LTR responsive alignment */}
              {errors.phone_number && (
                <span className="text-red-600 text-sm text-start">
                  {errors.phone_number}
                </span>
              )}
            </div>

            {/* Username Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.username.label")}
              </label>
              <input
                name="username"
                placeholder={t("formFields.username.placeholder")}
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
                {t("formFields.password.label")}
              </label>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder={t("formFields.password.placeholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600"
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
                {t("formFields.confirmPassword.label")}
              </label>
              <div className="relative">
                <input
                  name="password2"
                  value={formData.password2}
                  onChange={handleInputChange}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                  placeholder={t("formFields.confirmPassword.placeholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute end-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password2 && (
                <span className="text-red-600 text-sm">{errors.password2}</span>
              )}
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.birthDate.label")}
              </label>
              <input
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                type="date"
                className=" w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              />
              {errors.birth_date && (
                <span className="text-red-600 text-sm">
                  {errors.birth_date}
                </span>
              )}
            </div>

            {/* Gender Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.gender.label")}
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              >
                <option value="" disabled>
                  {t("formFields.gender.placeholder")}
                </option>
                <option value="male">
                  {t("formFields.gender.options.male")}
                </option>
                <option value="female">
                  {t("formFields.gender.options.female")}
                </option>
                <option value="other">
                  {t("formFields.gender.options.other")}
                </option>
              </select>
              {errors.gender && (
                <span className="text-red-600 text-sm">{errors.gender}</span>
              )}
            </div>

            {/* Nationality Field */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.nationality.label")}
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              >
                <option disabled value="">
                  {t("formFields.nationality.placeholder")}
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
                {t("formFields.currentResidence.label")}
              </label>
              <select
                name="current_residence"
                value={formData.current_residence}
                onChange={handleInputChange}
                className="w-full px-3 py-2 outline-none rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
              >
                <option disabled value="">
                  {t("formFields.currentResidence.placeholder")}
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.current_residence && (
                <span className="text-red-600 text-sm">
                  {errors.current_residence}
                </span>
              )}
            </div>

            {/* Fluent Languages Field */}
            <div className="flex flex-col space-y-2 w-full mb-10">
              <label className="text-xl font-medium text-[#1e256c]">
                {t("formFields.fluentLanguages.label")}
              </label>
              <Select
                name="fluent_languages"
                instanceId={useId()}
                isMulti
                options={languageOptions}
                value={languageOptions.filter((option) =>
                  formData.fluent_languages.includes(option.value)
                )}
                onChange={handleLanguageChange}
                placeholder={t("formFields.fluentLanguages.placeholder")}
                styles={customStylesForLanguageInput}
              />
              {errors.fluent_languages && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.fluent_languages}
                </p>
              )}
            </div>

            {/* Next Button */}
            <div className="flex justify-end  items-center gap-x-2 text-2xl pt-5">
              <span className="text-[#686b72]">
                {t("navigation.pageIndicator")}
              </span>
              <div onClick={handleNextClick}>
                <Button variant="secondary" size="large" roundedValue="full">
                  {t("navigation.next")}
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
