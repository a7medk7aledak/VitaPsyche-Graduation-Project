"use client";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa"; // Import lock icon

interface DoctorProfileProps {
  profileImageUrl: string;
  fullNameEn: string;
  fullNameAr: string;
  specialization: string;
  clinicName: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = (props) => {
  const [doctorData, setDoctorData] = useState({
    profileImageUrl: "/images/unknown-person.jpg", // Default image
    fullNameEn: "Dr. John Doe", // Real data
    fullNameAr: "د. جون دو", // Real data
    email: "johndoe@example.com", // Real data
    phoneNumber: "+1234567890", // Real data
    username: "johndoe", // Real data
    dateOfBirth: "1980-01-01", // Real data
    gender: "Male", // Real data
    nationality: "American", // Real data
    countryOfResidence: "USA", // Real data
    fluentLanguages: "English, Arabic", // Real data
    specialization: "Child Psychology", // Real data
    clinicName: "New York Psychiatry Clinic", // Real data
    paymentMethod: "Credit Card", // Dummy data (not provided in form)
    cardType: "Visa", // Dummy data (not provided in form)
    cardNumber: "**** **** **** 1234", // Dummy data (not provided in form)
    paypalConnected: false, // Dummy data (not provided in form)
    // New data for professional timeline
    careerTimeline: [
      { year: "2009", event: "Completed Psychiatry Residency" },
      { year: "2010", event: "Joined New York Psychiatry Clinic" },
      { year: "2015", event: "Specialized in Child Psychology" },
      { year: "2020", event: "Became Head of Child Psychiatry Department" },
    ],
  });

  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setDoctorData({
          ...doctorData,
          profileImageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    setEditing(false);
    console.log("Updated Data:", doctorData);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleChangePassword = () => {
    console.log("Changing password...");
  };

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-2 gap-6">
      {[
        { label: "Full Name (English)", key: "fullNameEn" },
        { label: "Full Name (Arabic)", key: "fullNameAr" },
        { label: "Email", key: "email", locked: true },
        { label: "Phone Number", key: "phoneNumber", locked: true },
        { label: "Username", key: "username", locked: true },
        { label: "Date of Birth", key: "dateOfBirth", locked: true },
        { label: "Gender", key: "gender" },
        { label: "Nationality", key: "nationality" },
        { label: "Country of Residence", key: "countryOfResidence" },
        { label: "Fluent Languages", key: "fluentLanguages" },
      ].map((field) => (
        <div key={field.key}>
          <p className="text-sm font-bold text-gray-700">
            {field.label}:{" "}
            {field.locked && <FaLock className="inline ml-2 text-gray-500" />}
          </p>
          {editing ? (
            <input
              name={field.key}
              value={doctorData[field.key as keyof typeof doctorData]}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          ) : (
            <p className="text-lg">
              {doctorData[field.key as keyof typeof doctorData]}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="grid grid-cols-2 gap-6">
      {[
        { label: "Payment Method", key: "paymentMethod", locked: true },
        { label: "Card Type", key: "cardType", locked: true },
        { label: "Card Number", key: "cardNumber", locked: true },
        { label: "PayPal Connected", key: "paypalConnected", locked: true },
      ].map((field) => (
        <div key={field.key}>
          <p className="text-sm font-bold text-gray-700">
            {field.label}:{" "}
            {field.locked && <FaLock className="inline ml-2 text-gray-500" />}
          </p>
          {editing ? (
            field.key === "paypalConnected" ? (
              <select
                name={field.key}
                value={doctorData[field.key] ? "Yes" : "No"}
                onChange={(e) =>
                  setDoctorData({
                    ...doctorData,
                    [field.key]: e.target.value === "Yes",
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              <input
                name={field.key}
                value={doctorData[field.key as keyof typeof doctorData]}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            )
          ) : (
            <p className="text-lg">
              {field.key === "paypalConnected"
                ? doctorData[field.key]
                  ? "Yes"
                  : "No"
                : doctorData[field.key as keyof typeof doctorData]}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const renderCareerTimeline = () => (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Career Timeline</h2>
      <ul className="timeline">
        {doctorData.careerTimeline.map((item, index) => (
          <li key={index} className="mb-4">
            <span className="text-gray-600">{item.year}</span>
            <p className="text-lg font-semibold">{item.event}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderDocuments = () => (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Documents</h2>
      <div className="space-y-2">
        <a href="/path-to-cv" className="text-blue-500 hover:underline">
          View CV
        </a>
        <a
          href="/path-to-qualifications"
          className="text-blue-500 hover:underline"
        >
          View Qualifications
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-2xl">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src={doctorData.profileImageUrl}
              alt={`Dr. ${doctorData.fullNameEn}`}
              className="w-24 h-24 rounded-full mr-4 object-cover"
            />
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {doctorData.fullNameEn}
              </h1>
              <p className="text-2xl text-gray-600">{doctorData.fullNameAr}</p>
              <p className="text-gray-600">
                {doctorData.specialization} | {doctorData.clinicName}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setEditing(!editing)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {editing ? "Cancel Edit" : "Edit Profile"}
            </button>
            <button
              onClick={handleChangePassword}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4">
          {["personal", "payment", "career", "documents"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-2 px-4 py-2 rounded-t-lg ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg mb-8">
          {activeTab === "personal" && renderPersonalInfo()}
          {activeTab === "payment" && renderPaymentInfo()}
          {activeTab === "career" && renderCareerTimeline()}
          {activeTab === "documents" && renderDocuments()}
        </div>

        {/* Save Button */}
        {editing && (
          <button
            onClick={handleSave}
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
