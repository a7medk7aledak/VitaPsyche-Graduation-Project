"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@app/store/authSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

// Interfaces
interface UserData {
  id: string;
  email: string;
  role: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  nationality: string;
  fluent_languages: string;
  current_residence: string;
}

interface LoginResponse {
  access_token: string;
  user: UserData;
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?: number;
  };
  message: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [role, setRole] = useState<"Visitor" | "Doctor">("Visitor");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post<LoginResponse>("/api/login", {
        email,
        password,
        role: role.toLowerCase(),
      });

      const { access_token, user } = response.data;

      // Set token in an HTTP-only cookie
      dispatch(setToken(access_token));
      localStorage.setItem("access_token", access_token);

      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      const apiError = error as ApiError;
      setError(
        apiError.response?.data?.error ||
          apiError.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Login | Vitapsyche</title>
      </Head>

      {/* Left Section (Form Section) */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center mb-6"
          >
            <Image
              src="/images/logo.png"
              alt="Vitapsyche Logo"
              width={64}
              height={64}
            />
            <h2 className="text-2xl font-semibold text-center text-teal-700 mb-2">
              Vitapsyche
            </h2>
          </motion.div>

          {/* Role Selection */}
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={() => setRole("Visitor")}
              className={`flex flex-col items-center mx-4 ${
                role === "Visitor" ? "text-maintext" : "text-gray-500"
              }`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              <div
                className={`w-16 h-16 rounded-full p-2 ${
                  role === "Visitor" ? "bg-button" : "bg-gray-100"
                }`}
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
              className={`flex flex-col items-center mx-4 ${
                role === "Doctor" ? "text-maintext" : "text-gray-500"
              }`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              <div
                className={`w-16 h-16 rounded-full p-2 ${
                  role === "Doctor" ? "bg-button" : "bg-gray-100"
                }`}
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

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-button" />
                ) : (
                  <FaEye className="text-button" />
                )}
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mb-4"
              >
                {error}
              </motion.p>
            )}

            {/* Forget Password */}
            <div className="mb-6 text-left">
              <Link href="/forgot-password" className="text-teal-600 text-sm">
                Forget password?
              </Link>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              className="w-full bg-heading transitions text-white py-2 rounded-md hover:bg-[#1baa97] transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
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

      {/* Right Section */}
      <div className="hidden md:block w-1/2 bg-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex items-center justify-center"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                filter: "brightness(0.95)", // Slightly dim the video
                opacity: 0.9, // Make it slightly transparent
              }}
            >
              <source src="/recap.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Optional overlay to ensure text readability */}
            <div className="absolute inset-0 bg-teal-50/30 backdrop-blur-[2px]" />

            {/* Optional content over video */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-heading text-center mb-4 z-10"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-maintext text-center max-w-md z-10"
              >
                Your mental health journey continues here
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
