"use client"; // This makes the component a Client Component

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa"; // Import icons
import "react-phone-input-2/lib/style.css";
import Link from "next/link";

// Dynamically load PhoneInput in a custom wrapper
const PhoneInputWrapper = () => {
  const [PhoneInput, setPhoneInput] = useState(null);

  useEffect(() => {
    const loadPhoneInput = async () => {
      const module = await import("react-phone-input-2");
      setPhoneInput(() => module.default);
    };
    loadPhoneInput();
  }, []);

  if (!PhoneInput) return null; // Show nothing or a loader until it's loaded

  return (
    <PhoneInput
      inputClass="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-green-400 pl-8 py-3 outline-none"
      country={"eg"}
      value={""}
      onChange={(phone) => console.log(phone)}
    />
  );
};

const Page = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [gender, setGender] = useState(""); // State to manage gender

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value); // Update the gender state when selected
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="f max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div className="flex items-center md:p-8 p-6 bg-white h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
            {/* Logo */}
            <div className="mb-8 text-center flex  items-center justify-center">
              <img src="/images/logo.png" alt="logo" className="w-32" />
              <p className="mr-2 text-3xl font-semibold spac text-heading">
                MindMed
              </p>
            </div>

            <div className="mb-12 items-center">
              <h3 className="text-3xl font-bold text-center text-maintext">
                Create an account
              </h3>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-maintext text-xs block mb-2">
                Full Name
              </label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-2 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-green-400 pl-8 py-3 outline-none"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-green-400 pl-8 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* Password 1 */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-2 text-gray-400" />
                <input
                  name="password"
                  type={showPassword1 ? "text" : "password"}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-green-400 pl-8 pr-10 py-3 outline-none"
                  placeholder="Enter password"
                />
                <div
                  className="absolute right-2 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility1}
                >
                  {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Password 2 */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-2 text-gray-400" />
                <input
                  name="confirm-password"
                  type={showPassword2 ? "text" : "password"}
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-green-400 pl-8 pr-10 py-3 outline-none"
                  placeholder="Confirm password"
                />
                <div
                  className="absolute right-2 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility2}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <PhoneInputWrapper />
              </div>
            </div>

            {/* Birthdate */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">
                Birth Date
              </label>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute left-2 text-gray-400" />
                <input
                  name="birthdate"
                  type="date"
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-green-400 pl-8 py-3 outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mt-8">
              <label className="text-maintext text-xs block mb-2">Gender</label>
              <div className="relative flex items-center">
                <FaVenusMars className="absolute left-2 text-gray-400" />
                <select
                  name="gender"
                  value={gender} // Bind value to the gender state
                  onChange={handleGenderChange} // Handle gender selection
                  required
                  className="w-full bg-transparent text-sm text-maintext border-b border-gray-300 focus:border-green-400 pl-8 py-3 outline-none"
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
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-maintext ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  className="text-green-500 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Register Button */}
            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-green-300 hover:bg-green-500 focus:outline-none"
              >
                Register
              </button>
            </div>
            <p className="text-sm text-maintext mt-8 text-left">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-green-400 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
