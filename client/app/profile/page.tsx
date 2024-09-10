"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaWallet,
  FaLock,
  FaEdit,
  FaCreditCard,
  FaCcVisa,
  FaPaypal,
} from "react-icons/fa"; // Importing icons

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [isEditMode, setIsEditMode] = useState(false); // To toggle between edit and view modes
  const [showSignOutModal, setShowSignOutModal] = useState(false); // For sign out modal
  const [profileData, setProfileData] = useState({
    nickname: "belalsq",
    phone: "+201123456789",
    email: "test@gmail.com",
    gender: "Male",
    birthYear: "2002",
  });

  // Toggle Edit Mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Show or hide the sign-out confirmation modal
  const toggleSignOutModal = () => {
    setShowSignOutModal(!showSignOutModal);
  };

  // Handle the sign-out process
  const handleSignOut = () => {
    setShowSignOutModal(false);
    console.log("User signed out");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 w-full bg-white shadow-md p-4 rounded-2xl h-auto lg:h-[350px] flex flex-col items-center">
          <div className="flex flex-col items-center">
            {/* Profile Image with Icon */}
            <div className="relative w-24 h-24 bg-button rounded-full mb-4 flex items-center justify-center">
              <FaUser className="text-white text-4xl" />
            </div>
            <h2 className="text-lg font-semibold text-heading">
              {profileData.nickname}
            </h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaWallet className="text-maintext" />
              <span>Wallet (0)</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/6 w-full bg-white shadow-md p-6 rounded-2xl">
          {/* Tabs */}
          <div className="flex justify-start space-x-4 border-b pb-4 mb-4">
            <button
              className={`text-lg font-medium text-maintext ${
                activeTab === "personalInfo" ? "border-b-2 border-heading text-heading" : ""
              }`}
              onClick={() => setActiveTab("personalInfo")}
            >
              Personal Information
            </button>
            <button
              className={`text-lg font-medium text-maintext ${
                activeTab === "paymentInfo" ? "border-b-2 border-heading text-heading" : ""
              }`}
              onClick={() => setActiveTab("paymentInfo")}
            >
              Payment Info
            </button>
          </div>

          {/* Content */}
          {activeTab === "personalInfo" && (
            <div className="space-y-4">
              {/* Edit Mode Toggle */}
              <button
                className="text-subbutton transitions flex items-center justify-center hover:text-hoversubbutton mb-4"
                onClick={toggleEditMode}
              >
                {isEditMode ? "Cancel Edit" : "Edit Profile"}
                <FaEdit className="ml-2 text-maintext transitions hover:text-hoversubbutton" />
              </button>

              {/* Personal Information */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-maintext" />
                  <span className="text-paragraphtext">Name (or Nickname)</span>
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    name="nickname"
                    value={profileData.nickname}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full max-w-[150px] lg:max-w-none"
                  />
                ) : (
                  <span className="font-medium">{profileData.nickname}</span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-maintext" />
                  <span className="text-paragraphtext">
                    Phone Number (Unverified)
                  </span>
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full max-w-[150px] lg:max-w-none"
                  />
                ) : (
                  <div className="space-x-2">
                    <span className="font-medium">{profileData.phone}</span>
                    <a href="#" className="text-heading font-semibold">
                      Verify
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-maintext" />
                  <span className="text-paragraphtext">Email (Unverified)</span>
                </div>
                {isEditMode ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full max-w-[150px] lg:max-w-none"
                  />
                ) : (
                  <div className="space-x-2">
                    <span className="font-medium">{profileData.email}</span>
                    <a href="#" className="text-heading font-semibold">
                      Verify
                    </a>
                  </div>
                )}
              </div>

              <p className="text-sm text-paragraphtext font-semibold">
                A verification email has been sent. Open it up to confirm your
                email address.
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-maintext" />
                  <span className="text-paragraphtext">Gender</span>
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full max-w-[150px] lg:max-w-none"
                  />
                ) : (
                  <span className="font-medium">{profileData.gender}</span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-maintext" />
                  <span className="text-paragraphtext">Year of birth</span>
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    name="birthYear"
                    value={profileData.birthYear}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full max-w-[150px] lg:max-w-none"
                  />
                ) : (
                  <span className="font-medium">{profileData.birthYear}</span>
                )}
              </div>

              {/* Save Button (only visible in edit mode) */}
              {isEditMode && (
                <button
                  className="w-full bg-heading text-white py-2 rounded-md hover:bg-[#139485] transitions"
                  onClick={toggleEditMode} // Save and switch back to view mode
                >
                  Save
                </button>
              )}

              {/* Other Buttons */}
              <div className="mt-6 space-y-4">
                <button className="w-full bg-heading text-white py-2 rounded-md  hover:bg-[#139485] transitions">
                  Change Password
                </button>
                <button
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transitions"
                  onClick={toggleSignOutModal}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}

          {activeTab === "paymentInfo" && (
            <div className="space-y-4">
              {/* Payment Info */}
              <div className="space-y-6">
                {/* Payment Method */}
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-heading" />
                    <span className="font-semibold text-paragraphtext">
                      Payment Method
                    </span>
                  </div>
                  <span className="font-medium text-heading">Active</span>
                </div>

                {/* Card Type */}
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaCcVisa className="text-blue-600 text-xl" />
                    <span className="font-semibold text-paragraphtext">
                      Card Type
                    </span>
                  </div>
                  <span className="font-medium">Visa</span>
                </div>

                {/* Card Number */}
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaLock className="text-maintext" />
                    <span className="font-semibold text-paragraphtext">
                      Card Number
                    </span>
                  </div>
                  <span className="font-medium">**** **** **** 1234</span>
                </div>

                {/* PayPal */}
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaPaypal className="text-blue-500 text-xl" />
                    <span className="font-semibold text-paragraphtext">
                      PayPal
                    </span>
                  </div>
                  <span className="font-medium text-heading">Connected</span>
                </div>
              </div>

              {/* Add New Payment Method */}
              <div className="mt-6">
                <button className="w-full bg-subbutton text-white py-2 rounded-md hover:bg-hoversubbutton transitions">
                  Add Payment Method
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Sign-out Confirmation Modal */}
        {showSignOutModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96">
              <h2 className="text-lg font-semibold text-heading mb-4">
                Are you sure you want to sign out?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  onClick={handleSignOut}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={toggleSignOutModal}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
