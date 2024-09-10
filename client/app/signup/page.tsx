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

const LoginPage = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // For checkboxes, use the checked property instead of value
    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: isChecked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle phone input change
  const handlePhoneChange = (phone: string) => {
    setFormData({
      ...formData,
      phone,
    });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { password, confirmPassword, termsAccepted } = formData;

    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Process the form data (send it to an API, save locally, etc.)
    console.log("Form submitted successfully:", formData);

    // You can reset the form or redirect the user after successful submission
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        {/* Left Section (Form Section) */}
        <div className="flex items-center md:p-8 p-6 bg-white h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
            {/* Logo */}
            <div className="mb-8 text-center flex items-center justify-center">
              <img src="/images/logo.png" alt="logo" className="w-32" />
              <p className="mr-2 text-3xl font-semibold text-heading">MindMed</p>
            </div>

            {/* Title */}
            <div className="mb-12 items-center">
              <h3 className="text-3xl font-bold text-center text-maintext">Create an account</h3>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-maintext text-xs block mb-2">Full Name</label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-2 text-button" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-2 text-button" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-2 text-button" />
                <input
                  name="password"
                  type={showPassword1 ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 pr-10 py-3 outline-none"
                  placeholder="Enter password"
                />
                <div
                  className="absolute right-2 cursor-pointer text-button"
                  onClick={togglePasswordVisibility1}
                >
                  {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Confirm Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-2 text-button" />
                <input
                  name="confirmPassword"
                  type={showPassword2 ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 pr-10 py-3 outline-none"
                  placeholder="Confirm password"
                />
                <div
                  className="absolute right-2 cursor-pointer text-button"
                  onClick={togglePasswordVisibility2}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Phone Number with Country Flags */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Phone Number</label>
              <div className="relative flex items-center">
                <PhoneInput
                  country={"eg"}
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
              </div>
            </div>

            {/* Birthdate */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Birth Date</label>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute left-2 text-button" />
                <input
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Gender</label>
              <div className="relative flex items-center">
                <FaVenusMars className="absolute left-2 text-button" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-heading pl-8 py-3 outline-none"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-8">
              <input
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-4 w-4 shrink-0 rounded"
              />
              <label htmlFor="termsAccepted" className="text-maintext ml-3 block text-sm">
                I accept the{" "}
                <a
                  href="#"
                  className="text-buttonhov font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Register Button */}
            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-white bg-[#23c2af] font-semibold rounded-md bg-transparent transitions hover:bg-[#1baa97] focus:outline-none"
              >
                Register
              </button>
            </div>

            <p className="text-sm text-maintext mt-8 text-left">
              Already have an account?{" "}
              <Link href="/signin" className="text-heading font-semibold hover:underline ml-1">
                Login here
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section (Image Section) */}
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
