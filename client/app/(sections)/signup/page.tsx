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
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthdate: string;
  gender: string;
  termsAccepted: boolean;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
    status?: number;
  };
  message: string;
}

const LoginPage: React.FC = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
    gender: "",
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
      phone,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      birthdate,
      gender,
      termsAccepted,
    } = formData;

    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "register/patient/",
        {
          name,
          email,
          password,
          phone,
          birthdate,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Registration successful:", response.data);
      alert("Registration successful! You can now log in.");
    } catch (error: unknown) {
      const isApiError = (error: unknown): error is ApiError => {
        return (
          typeof error === "object" && error !== null && "message" in error
        );
      };

      let errorMessage = "An error occurred. Please try again.";

      if (isApiError(error)) {
        errorMessage = error.response?.data?.detail || error.message;
      }

      alert(`Registration failed: ${errorMessage}`);
      console.error("Error during registration:", error);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      icon: FaUser,
      placeholder: "Enter name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      icon: FaEnvelope,
      placeholder: "Enter email",
    },
    {
      name: "password",
      label: "Password",
      type: showPassword1 ? "text" : "password",
      icon: FaLock,
      placeholder: "Enter password",
      showPassword: showPassword1,
      togglePassword: togglePasswordVisibility1,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: showPassword2 ? "text" : "password",
      icon: FaLock,
      placeholder: "Confirm password",
      showPassword: showPassword2,
      togglePassword: togglePasswordVisibility2,
    },
  ];

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
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

            {formFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mt-8"
              >
                <label className="text-maintext text-xs block mb-2">
                  {field.label}
                </label>
                <div className="relative flex items-center">
                  <field.icon className="absolute left-2 text-button" />
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name as keyof FormData] as string}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                    placeholder={field.placeholder}
                  />
                  {field.togglePassword && (
                    <div
                      className="absolute right-2 cursor-pointer text-button"
                      onClick={field.togglePassword}
                    >
                      {field.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <label className="text-maintext text-xs block mb-2">
                Phone Number
              </label>
              <PhoneInput
                country="eg"
                value={formData.phone}
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

            {["birthdate", "gender"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="mt-8"
              >
                <label className="text-maintext text-xs block mb-2">
                  {field === "birthdate" ? "Birth Date" : "Gender"}
                </label>
                <div className="relative flex items-center">
                  {field === "birthdate" ? (
                    <FaCalendarAlt className="absolute left-2 text-button" />
                  ) : (
                    <FaVenusMars className="absolute left-2 text-button" />
                  )}
                  {field === "birthdate" ? (
                    <input
                      name="birthdate"
                      type="date"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                    />
                  ) : (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
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
                I accept the{" "}
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
                className="w-max shadow-xl py-3 px-6 text-sm text-white bg-[#23c2af] font-semibold rounded-md transition hover:bg-[#1baa97] focus:outline-none"
              >
                Register
              </button>
            </div>

            <p className="text-sm text-maintext mt-8 text-left">
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

export default LoginPage;
