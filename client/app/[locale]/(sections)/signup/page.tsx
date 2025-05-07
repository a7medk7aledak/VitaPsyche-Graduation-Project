"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaVenusMars,
  FaGlobe,
  FaLanguage,
  FaHome,
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@app/store/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import Head from "next/head";

interface FormData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  nationality: string;
  fluent_languages: string;
  current_residence: string;
  termsAccepted: boolean;
}

interface ApiErrorData {
  error?: string;
  message?: string;
  detail?: string;
  username?: string[];
  email?: string[];
  password?: string[];
  [key: string]: string | string[] | undefined;
}

interface ApiError {
  response?: {
    data?: ApiErrorData;
    status?: number;
  };
  message: string;
}

interface UserData {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  nationality: string;
  fluent_languages: string;
  current_residence: string;
  role: string;
}

const SignUpPage: React.FC = () => {
  const t = useTranslations("signup");
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    nationality: "",
    fluent_languages: "",
    current_residence: "",
    termsAccepted: false,
  });

  const togglePasswordVisibility1 = () => setShowPassword1(!showPassword1);
  const togglePasswordVisibility2 = () => setShowPassword2(!showPassword2);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({
      ...prev,
      phone_number: phone,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.termsAccepted) {
      toast.error(t("errors.acceptTerms"));
      return;
    }
    if (formData.password !== formData.password2) {
      toast.error(t("errors.passwordsDoNotMatch"));
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading(t("errors.creatingAccount"));

    // Create FormData object
    const apiFormData = new FormData();
    apiFormData.append("username", formData.username);
    apiFormData.append("first_name", formData.first_name);
    apiFormData.append("last_name", formData.last_name);
    apiFormData.append("email", formData.email);
    apiFormData.append("password", formData.password);
    apiFormData.append("password2", formData.password2);
    apiFormData.append("phone_number", formData.phone_number);
    apiFormData.append("birth_date", formData.birth_date);
    apiFormData.append("gender", formData.gender);
    apiFormData.append("nationality", formData.nationality);
    apiFormData.append("fluent_languages", formData.fluent_languages);
    apiFormData.append("current_residence", formData.current_residence);

    try {
      const response = await axios.post("/api/register/patient", apiFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userData: UserData = {
        id: response.data.id,
        username: response.data.username,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        birth_date: response.data.birth_date,
        gender: response.data.gender,
        nationality: response.data.nationality,
        fluent_languages: response.data.fluent_languages,
        current_residence: response.data.current_residence,
        role: response.data.role,
      };

      dispatch(setUser(userData));
      toast.success(t("success.accountCreated"), {
        id: loadingToast,
      });
      router.push("/");
    } catch (error) {
      const apiError = error as ApiError;
      let errorMessage = t("errors.registrationFailed");

      if (apiError.response?.data) {
        const data = apiError.response.data;

        if (data.username) {
          errorMessage = t("errors.usernameTaken");
        } else if (data.email) {
          errorMessage = t("errors.emailRegistered");
        } else if (data.password) {
          errorMessage = Array.isArray(data.password)
            ? data.password[0]
            : data.password;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.detail) {
          errorMessage = data.detail;
        }
      }

      toast.error(errorMessage, {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (
    name: string,
    label: string,
    type: string,
    icon: React.ElementType,
    value: string,
    required: boolean,
    placeholder: string,
    showPassword?: boolean,
    togglePassword?: () => void
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <label className="text-maintext text-xs block mb-2">{label}</label>
      <div className="relative flex items-center">
        {React.createElement(icon, {
          className: "absolute start-2 text-button",
        })}
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleInputChange}
          required={required}
          className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading ps-8 py-3 outline-none"
          placeholder={placeholder}
        />
        {togglePassword && (
          <div
            className="absolute end-2 cursor-pointer text-button"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <motion.div
          className="flex items-center md:p-8 p-6 bg-white h-full lg:w-11/12 lg:ms-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
            <div className="mb-8 text-center flex items-center justify-center">
              <img src="/images/logo.png" alt="logo" className="w-32" />
              <p className="me-2 text-3xl font-semibold text-heading">
                Vitapsyche
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center text-maintext">
                {t("createAccount")}
              </h3>
            </div>

            {renderInputField(
              "username",
              t("form.username"),
              "text",
              FaUser,
              formData.username,
              true,
              t("placeholders.enterUsername")
            )}

            {renderInputField(
              "first_name",
              t("form.firstName"),
              "text",
              FaUser,
              formData.first_name,
              true,
              t("placeholders.enterFirstName")
            )}

            {renderInputField(
              "last_name",
              t("form.lastName"),
              "text",
              FaUser,
              formData.last_name,
              true,
              t("placeholders.enterLastName")
            )}

            {renderInputField(
              "email",
              t("form.email"),
              "email",
              FaEnvelope,
              formData.email,
              true,
              t("placeholders.enterEmail")
            )}

            {renderInputField(
              "password",
              t("form.password"),
              showPassword1 ? "text" : "password",
              FaLock,
              formData.password,
              true,
              t("placeholders.enterPassword"),
              showPassword1,
              togglePasswordVisibility1
            )}

            {renderInputField(
              "password2",
              t("form.confirmPassword"),
              showPassword2 ? "text" : "password",
              FaLock,
              formData.password2,
              true,
              t("placeholders.enterConfirmPassword"),
              showPassword2,
              togglePasswordVisibility2
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <label className="text-maintext text-xs block mb-2">
                {t("form.phoneNumber")}
              </label>
              <div dir="ltr">
                <PhoneInput
                  country="eg"
                  value={formData.phone_number}
                  onChange={handlePhoneChange}
                  inputStyle={{
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid #d1d5db",
                    paddingLeft: "48px",
                    fontSize: "14px",
                    color: "#1f2937",
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid #d1d5db",
                  }}
                  placeholder={t("placeholders.enterPhoneNumber")}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <label className="text-maintext text-xs block mb-2">
                {t("form.birthDate")}
              </label>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute start-2 text-button hidden ltr:flex" />
                <input
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading ltr:ps-8 py-3 outline-none"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <label className="text-maintext text-xs block mb-2">
                {t("form.gender")}
              </label>
              <div className="relative flex items-center">
                <FaVenusMars className="absolute start-2 text-button" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading ps-8 py-3 outline-none"
                >
                  <option value="">{t("form.genderOptions.select")}</option>
                  <option value="male">{t("form.genderOptions.male")}</option>
                  <option value="female">
                    {t("form.genderOptions.female")}
                  </option>
                  <option value="other">{t("form.genderOptions.other")}</option>
                </select>
              </div>
            </motion.div>

            {renderInputField(
              "nationality",
              t("form.nationality"),
              "text",
              FaGlobe,
              formData.nationality,
              true,
              t("placeholders.enterNationality")
            )}

            {renderInputField(
              "fluent_languages",
              t("form.fluentLanguages"),
              "text",
              FaLanguage,
              formData.fluent_languages,
              true,
              t("placeholders.enterFluentLanguages")
            )}

            {renderInputField(
              "current_residence",
              t("form.currentResidence"),
              "text",
              FaHome,
              formData.current_residence,
              true,
              t("placeholders.enterCurrentResidence")
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mt-8"
            >
              <input
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-4 w-4 shrink-0 rounded"
              />
              <label className="text-maintext ms-3 block text-sm">
                {t("form.termsAndConditions")}{" "}
                <a
                  href="#"
                  className="text-buttonhov font-semibold hover:underline ms-1"
                >
                  {t("form.termsLink")}
                </a>
              </label>
            </motion.div>

            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-max shadow-xl py-3 px-6 text-sm text-white bg-[#23c2af] font-semibold rounded-md transition hover:bg-[#1baa97] focus:outline-none ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>{t("form.creatingAccount")}</span>
                  </div>
                ) : (
                  t("form.register")
                )}
              </button>
            </div>

            <p className="text-sm text-maintext mt-8 text-center">
              {t("form.alreadyHaveAccount")}{" "}
              <Link
                href="/signin"
                className="text-heading font-semibold hover:underline ms-1"
              >
                {t("form.loginHere")}
              </Link>
            </p>
          </form>
        </motion.div>
        <div className="hidden md:flex items-center justify-center bg-teal-50 h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="lg:max-w-[85%] w-full h-auto object-contain mx-auto transition-opacity duration-300"
            style={{ opacity: 0.95 }}
            onLoadedData={(e) => {
              // Optional: Add animation when video loads
              const video = e.target as HTMLVideoElement;
              video.style.opacity = "1";
            }}
          >
            <source src="/recap.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
