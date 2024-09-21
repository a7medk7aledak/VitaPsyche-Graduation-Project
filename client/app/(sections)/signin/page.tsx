"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion from framer-motion

const LoginPage = () => {
  const [role, setRole] = useState<"Visitor" | "Doctor">("Visitor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    console.log("Submitting form...");
    console.log("Role:", role);
    console.log("Email:", email);
    console.log("Password:", password);
    
    setError(""); // Clear any previous errors
  };

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Login | MindMed</title>
      </Head>

      {/* Left Section (Form Section) */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-8 py-10">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center mb-6"
          >
            <Image
              src="/images/logo.png"
              alt="MindMed Logo"
              width={64}
              height={64}
            />
            <h2 className="text-2xl font-semibold text-center text-teal-700 mb-2">MindMed</h2>
          </motion.div>

          {/* Sign in as Title */}
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl font-medium text-center text-blue-900 mb-8"
          >
            Sign in as
          </motion.h3>

          {/* Role Selection */}
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={() => setRole("Visitor")}
              className={`flex flex-col items-center mx-4 ${role === "Visitor" ? "text-maintext" : "text-gray-500"}`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-16 h-16 rounded-full p-2 ${role === "Visitor" ? "bg-button" : "bg-gray-100"}`}
              >
                <Image
                  src="/images/user.png"
                  alt="Visitor"
                  width={64}
                  height={64}
                />
              </div>
              <span className="mt-2 text-sm">Visitor</span>
            </motion.button>

            <motion.button
              onClick={() => setRole("Doctor")}
              className={`flex flex-col items-center mx-4 ${role === "Doctor" ? "text-maintext" : "text-gray-500"}`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-16 h-16 rounded-full p-2 ${role === "Doctor" ? "bg-button" : "bg-gray-100"}`}
              >
                <Image
                  src="/images/doctor.png"
                  alt="Doctor"
                  width={64}
                  height={64}
                />
              </div>
              <span className="mt-2 text-sm">Doctor</span>
            </motion.button>
          </div>

          {/* Email Input */}
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 relative"
            >
              <FaEnvelope className="absolute left-3 top-3 text-button" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-buttonhov"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 relative"
            >
              <FaLock className="absolute left-3 top-3 text-button" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-buttonhov"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash className="text-button" /> : <FaEye className="text-button" />}
              </div>
            </motion.div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Forget Password */}
            <div className="mb-6 text-left">
              <a href="#" className="text-teal-600 text-sm">
                Forget password?
              </a>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              className="w-full bg-heading transitions text-white py-2 rounded-md hover:bg-[#1baa97] transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-center text-sm"
          >
            If you do not have an account{" "}
            <Link href="/signup" className="text-heading font-semibold">
              Sign Up
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Right Section (Empty or Decorative Section) */}
      <div className="hidden md:block w-1/2 bg-teal-50">
        <img
          src="https://readymadeui.com/signin-image.webp"
          alt="login-image"
          width={900}
          height={900}
          className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
        />
      </div>
    </div>
  );
};

export default LoginPage;
