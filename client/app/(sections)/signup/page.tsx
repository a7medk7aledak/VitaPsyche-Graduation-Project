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
import { setUser } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
      toast.error("Please accept the terms and conditions.");
      return;
    }
    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Creating your account...");

    const apiData = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
      phone_number: formData.phone_number,
      birth_date: formData.birth_date,
      gender: formData.gender,
      nationality: formData.nationality,
      fluent_languages: formData.fluent_languages,
      current_residence: formData.current_residence,
    };

    try {
      const response = await axios.post("/api/register/patient", apiData);

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
      toast.success("Account created successfully!", {
        id: loadingToast,
      });
      router.push("/");
    } catch (error) {
      const apiError = error as ApiError;
      let errorMessage = "Registration failed. Please try again.";

      if (apiError.response?.data) {
        const data = apiError.response.data;

        if (data.username) {
          errorMessage = "This username is already taken.";
        } else if (data.email) {
          errorMessage = "This email is already registered.";
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
          className: "absolute left-2 text-button",
        })}
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleInputChange}
          required={required}
          className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        {togglePassword && (
          <div
            className="absolute right-2 cursor-pointer text-button"
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <motion.div
          className="flex items-center md:p-8 p-6 bg-white h-full lg:w-11/12 lg:ml-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
            <div className="mb-8 text-center flex items-center justify-center">
              <img src="/images/logo.png" alt="logo" className="w-32" />
              <p className="mr-2 text-3xl font-semibold text-heading">
                Vitapsyche
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center text-maintext">
                Create an account
              </h3>
            </div>

            {renderInputField(
              "username",
              "Username",
              "text",
              FaUser,
              formData.username,
              true
            )}

            {renderInputField(
              "first_name",
              "First Name",
              "text",
              FaUser,
              formData.first_name,
              true
            )}

            {renderInputField(
              "last_name",
              "Last Name",
              "text",
              FaUser,
              formData.last_name,
              true
            )}

            {renderInputField(
              "email",
              "Email",
              "email",
              FaEnvelope,
              formData.email,
              true
            )}

            {renderInputField(
              "password",
              "Password",
              showPassword1 ? "text" : "password",
              FaLock,
              formData.password,
              true,
              showPassword1,
              togglePasswordVisibility1
            )}

            {renderInputField(
              "password2",
              "Confirm Password",
              showPassword2 ? "text" : "password",
              FaLock,
              formData.password2,
              true,
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
                Phone Number
              </label>
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
                placeholder="Enter phone number"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <label className="text-maintext text-xs block mb-2">
                Birth Date
              </label>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute left-2 text-button" />
                <input
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <label className="text-maintext text-xs block mb-2">Gender</label>
              <div className="relative flex items-center">
                <FaVenusMars className="absolute left-2 text-button" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </motion.div>

            {renderInputField(
              "nationality",
              "Nationality",
              "text",
              FaGlobe,
              formData.nationality,
              true
            )}

            {renderInputField(
              "fluent_languages",
              "Fluent Languages",
              "text",
              FaLanguage,
              formData.fluent_languages,
              true
            )}

            {renderInputField(
              "current_residence",
              "Current Residence",
              "text",
              FaHome,
              formData.current_residence,
              true
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
              <label className="text-maintext ml-3 block text-sm">
                I accept the
                <a
                  href="#"
                  className="text-buttonhov font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
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
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>

            <p className="text-sm text-maintext mt-8 text-center">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-heading font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </motion.div>

        <div className="hidden md:flex items-center justify-center bg-teal-50 h-full">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-auto object-contain mx-auto"
            alt="login-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
