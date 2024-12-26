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

const LoginPage: React.FC = () => {
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
      alert("Please accept the terms and conditions.");
      return;
    }
    if (formData.password !== formData.password2) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/register/patient", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Registration successful:", response.data);
      alert("Registration successful! You can now log in.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || "Registration failed";
      alert(errorMessage);
      console.error("Error during registration:", error);
    }
  };

  const formFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      icon: FaUser,
      required: true,
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      icon: FaUser,
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      icon: FaUser,
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      icon: FaEnvelope,
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: showPassword1 ? "text" : "password",
      icon: FaLock,
      required: true,
      showPassword: showPassword1,
      togglePassword: togglePasswordVisibility1,
    },
    {
      name: "password2",
      label: "Confirm Password",
      type: showPassword2 ? "text" : "password",
      icon: FaLock,
      required: true,
      showPassword: showPassword2,
      togglePassword: togglePasswordVisibility2,
    },
  ];

  const additionalFields = [
    {
      name: "nationality",
      label: "Nationality",
      type: "text",
      icon: FaGlobe,
      required: true,
    },
    {
      name: "fluent_languages",
      label: "Fluent Languages",
      type: "text",
      icon: FaLanguage,
      required: true,
    },
    {
      name: "current_residence",
      label: "Current Residence",
      type: "text",
      icon: FaHome,
      required: true,
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
                    required={field.required}
                    className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
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
              transition={{ duration: 0.5, delay: 0.6 }}
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
              transition={{ duration: 0.5, delay: 0.7 }}
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

            {additionalFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
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
                    required={field.required}
                    className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
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
