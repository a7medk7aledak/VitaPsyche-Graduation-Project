"use client";
import React, { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface DoctorProfileProps {
  // ... (previous props remain the same)
}

const DoctorProfile: React.FC<DoctorProfileProps> = (props) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [editing, setEditing] = useState(false);
  const [doctorData, setDoctorData] = useState(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEditing(false);
    console.log("Updated Data:", doctorData);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement logout logic here
  };

  const handleChangePassword = () => {
    console.log("Changing password...");
    // Implement password change logic here
  };

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-2 gap-6">
      {[
        { label: "Full Name (English)", key: "fullNameEn" },
        { label: "Full Name (Arabic)", key: "fullNameAr" },
        { label: "Email", key: "email", sensitive: true },
        { label: "Phone Number", key: "phoneNumber", sensitive: true },
        { label: "Username", key: "username" },
        { label: "Date of Birth", key: "dateOfBirth" },
        { label: "Gender", key: "gender" },
        { label: "Nationality", key: "nationality" },
        { label: "Country of Residence", key: "countryOfResidence" },
        { label: "Fluent Languages", key: "fluentLanguages" },
      ].map((field) => (
        <div key={field.key}>
          <p className="text-sm font-bold text-gray-700 flex items-center">
            {field.label}:{" "}
            {field.sensitive && <Lock className="ml-1 w-4 h-4" />}
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
        { label: "Payment Method", key: "paymentMethod" },
        { label: "Card Type", key: "cardType" },
        { label: "Card Number", key: "cardNumber" },
        { label: "PayPal Connected", key: "paypalConnected" },
      ].map((field) => (
        <div key={field.key}>
          <p className="text-sm font-bold text-gray-700 flex items-center">
            {field.label}: <Lock className="ml-1 w-4 h-4" />
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

  const renderProfessionalInfo = () => (
    <div className="grid grid-cols-2 gap-6">
      {[
        { label: "Category", key: "category" },
        { label: "Specialization", key: "specialization" },
        { label: "Years of Experience", key: "yearsOfExperience" },
        { label: "License Number", key: "licenseNumber" },
        { label: "Licensing Organization", key: "licensingOrganization" },
        { label: "Clinic Name", key: "clinicName" },
        { label: "Availability", key: "availability" },
      ].map((field) => (
        <div key={field.key}>
          <p className="text-sm font-bold text-gray-700">{field.label}:</p>
          <p className="text-lg">
            {doctorData[field.key as keyof typeof doctorData]}
          </p>
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => {
    if (
      !doctorData.professionalTimeline ||
      doctorData.professionalTimeline.length === 0
    ) {
      return <p>No professional timeline data available.</p>;
    }

    return (
      <div className="relative border-l-2 border-blue-500 pl-8">
        {doctorData.professionalTimeline.map((item, index) => (
          <div key={index} className="mb-8 relative">
            <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-blue-500"></div>
            <p className="text-sm font-bold text-gray-700">{item.year}</p>
            <p className="text-lg">{item.event}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderDocuments = () => (
    <div className="grid grid-cols-1 gap-4">
      {doctorData.cvUrl && (
        <div>
          <p className="text-sm font-bold text-gray-700">
            Curriculum Vitae (CV):
          </p>
          <a
            href={doctorData.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View CV
          </a>
        </div>
      )}
      {doctorData.qualificationsUrl && (
        <div>
          <p className="text-sm font-bold text-gray-700">
            Professional Qualifications:
          </p>
          <a
            href={doctorData.qualificationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Qualifications
          </a>
        </div>
      )}
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
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {doctorData.prefix} {doctorData.fullNameEn}
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
          {["personal", "payment", "professional", "timeline", "documents"].map(
            (tab) => (
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
            )
          )}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg mb-8">
          {activeTab === "personal" && renderPersonalInfo()}
          {activeTab === "payment" && renderPaymentInfo()}
          {activeTab === "professional" && renderProfessionalInfo()}
          {activeTab === "timeline" && renderTimeline()}
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
