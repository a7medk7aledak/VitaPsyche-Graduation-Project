"use client";

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaWallet,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLanguage,
  FaHome,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { logout } from "@/app/store/authSlice";
import { motion } from "framer-motion";
import Navbar from "@components/common/Navbar";

interface ProfileData {
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
}

interface ProfileFieldProps {
  icon: React.ElementType;
  label: string;
  value: string;
  name: string;
}

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState<"personalInfo" | "paymentInfo">(
    "personalInfo"
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showSignOutModal, setShowSignOutModal] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    nationality: "",
    fluent_languages: "",
    current_residence: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        birth_date: user.birth_date || "",
        gender: user.gender || "",
        nationality: user.nationality || "",
        fluent_languages: user.fluent_languages || "",
        current_residence: user.current_residence || "",
      });
    }
  }, [user]);

  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignOut = (): void => {
    dispatch(logout());
    router.push("/");
  };

  const ProfileField: React.FC<ProfileFieldProps> = ({
    icon: Icon,
    label,
    value,
    name,
  }) => (
    <motion.div
      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center space-x-3">
        <Icon className="text-teal-600 text-xl" />
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      {isEditMode ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          className="border rounded-md p-2 w-full max-w-[200px] focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      ) : (
        <span className="text-gray-800 font-semibold">{value}</span>
      )}
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <motion.aside
              className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6 flex items-center justify-center">
                  <FaUser className="text-white text-5xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {profileData.first_name} {profileData.last_name}
                </h2>
                <p className="text-gray-600 mb-4">@{profileData.username}</p>
                <div className="flex items-center space-x-2 text-teal-600">
                  <FaWallet />
                  <span>Wallet Balance: $0</span>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.main
              className="lg:col-span-9 bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tabs */}
              <div className="flex space-x-6 border-b border-gray-200 mb-6">
                <button
                  className={`pb-4 px-2 text-lg font-medium transition-colors ${
                    activeTab === "personalInfo"
                      ? "text-teal-600 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-teal-600"
                  }`}
                  onClick={() => setActiveTab("personalInfo")}
                >
                  Personal Information
                </button>
                <button
                  className={`pb-4 px-2 text-lg font-medium transition-colors ${
                    activeTab === "paymentInfo"
                      ? "text-teal-600 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-teal-600"
                  }`}
                  onClick={() => setActiveTab("paymentInfo")}
                >
                  Payment Information
                </button>
              </div>

              {activeTab === "personalInfo" && (
                <div className="space-y-4">
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={toggleEditMode}
                      className="flex items-center space-x-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      <FaEdit />
                      <span>
                        {isEditMode ? "Save Changes" : "Edit Profile"}
                      </span>
                    </button>
                  </div>

                  <div className="grid gap-4">
                    <ProfileField
                      icon={FaUser}
                      label="Username"
                      value={profileData.username}
                      name="username"
                    />
                    <ProfileField
                      icon={FaUser}
                      label="First Name"
                      value={profileData.first_name}
                      name="first_name"
                    />
                    <ProfileField
                      icon={FaUser}
                      label="Last Name"
                      value={profileData.last_name}
                      name="last_name"
                    />
                    <ProfileField
                      icon={FaEnvelope}
                      label="Email"
                      value={profileData.email}
                      name="email"
                    />
                    <ProfileField
                      icon={FaPhone}
                      label="Phone Number"
                      value={profileData.phone_number}
                      name="phone_number"
                    />
                    <ProfileField
                      icon={FaBirthdayCake}
                      label="Birth Date"
                      value={profileData.birth_date}
                      name="birth_date"
                    />
                    <ProfileField
                      icon={FaVenusMars}
                      label="Gender"
                      value={profileData.gender}
                      name="gender"
                    />
                    <ProfileField
                      icon={FaGlobe}
                      label="Nationality"
                      value={profileData.nationality}
                      name="nationality"
                    />
                    <ProfileField
                      icon={FaLanguage}
                      label="Fluent Languages"
                      value={profileData.fluent_languages}
                      name="fluent_languages"
                    />
                    <ProfileField
                      icon={FaHome}
                      label="Current Residence"
                      value={profileData.current_residence}
                      name="current_residence"
                    />
                  </div>

                  <div className="mt-8 space-y-4">
                    <button
                      className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      onClick={() => {
                        /* Handle password change */
                      }}
                    >
                      Change Password
                    </button>
                    <button
                      className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => setShowSignOutModal(true)}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "paymentInfo" && (
                <div>{/* Your payment info content */}</div>
              )}
            </motion.main>
          </div>
        </div>

        {/* Sign Out Modal */}
        {showSignOutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-2xl p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Sign Out Confirmation
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to sign out? You will need to log in again
                to access your account.
              </p>
              <div className="flex space-x-4">
                <button
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setShowSignOutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
