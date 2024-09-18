"use client";
import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

interface DoctorProfileProps {
  profileImageUrl?: string;
  fullNameEn?: string;
  fullNameAr?: string;
  specialization?: string;
  clinicName?: string;
}

interface CareerTimelineItem {
  year: string;
  event: string;
}

interface DoctorData {
  profileImageUrl: string;
  fullNameEn: string;
  fullNameAr: string;
  specialization: string;
  clinicName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  countryOfResidence: string;
  fluentLanguages: string;
  paymentMethod: string;
  cardType: string;
  cardNumber: string;
  paypalConnected: boolean;
  careerTimeline: CareerTimelineItem[];
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  profileImageUrl,
  fullNameEn,
  fullNameAr,
  specialization,
  clinicName,
}) => {
  const [doctorData, setDoctorData] = useState<DoctorData>({
    profileImageUrl: profileImageUrl || "/images/default-avatar.png",
    fullNameEn: fullNameEn || "Dr. John Doe",
    fullNameAr: fullNameAr || "د. جون دو",
    specialization: specialization || "Psychiatry",
    clinicName: clinicName || "Unknown Clinic",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    username: "johndoe",
    password: "********",
    dateOfBirth: "1980-01-01",
    gender: "Male",
    nationality: "American",
    countryOfResidence: "USA",
    fluentLanguages: "English, Arabic",
    paymentMethod: "Credit Card",
    cardType: "Visa",
    cardNumber: "**** **** **** 1234",
    paypalConnected: false,
    careerTimeline: [
      { year: "2009", event: "Completed Psychiatry Residency" },
      { year: "2010", event: "Joined New York Psychiatry Clinic" },
      { year: "2015", event: "Specialized in Child Psychology" },
      { year: "2020", event: "Became Head of Child Psychiatry Department" },
    ],
  });

  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (result && typeof result === "string") {
          setDoctorData((prevData) => ({
            ...prevData,
            profileImageUrl: result,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-2 gap-6">
      {[
        { label: "Full Name (English)", key: "fullNameEn" },
        { label: "Full Name (Arabic)", key: "fullNameAr" },
        { label: "Email", key: "email", locked: true },
        { label: "Phone Number", key: "phoneNumber", locked: true },
        { label: "Username", key: "username", locked: true },
        { label: "Password", key: "password", type: "password" },
        { label: "Date of Birth", key: "dateOfBirth", locked: true },
        { label: "Gender", key: "gender" },
        { label: "Nationality", key: "nationality" },
        { label: "Country of Residence", key: "countryOfResidence" },
        { label: "Fluent Languages", key: "fluentLanguages" },
      ].map((field) => (
        <div key={field.key}>
          <p className="text-sm font-bold text-gray-700">
            {field.label}{" "}
            {field.locked && <FaLock className="inline ml-2 text-gray-500" />}
          </p>
          {editing && !field.locked ? (
            field.key === "password" ? (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name={field.key}
                  value={doctorData[field.key as keyof DoctorData] as string}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            ) : (
              <input
                name={field.key}
                value={doctorData[field.key as keyof DoctorData] as string}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            )
          ) : (
            <p className="text-lg">
              {field.key === "password"
                ? "********"
                : String(doctorData[field.key as keyof DoctorData])}
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
            {field.label}{" "}
            {field.locked && <FaLock className="inline ml-2 text-gray-500" />}
          </p>
          {editing && !field.locked ? (
            field.key === "paypalConnected" ? (
              <select
                name={field.key}
                value={doctorData[field.key] ? "Yes" : "No"}
                onChange={(e) =>
                  setDoctorData((prevData) => ({
                    ...prevData,
                    [field.key]: e.target.value === "Yes",
                  }))
                }
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              <input
                name={field.key}
                value={doctorData[field.key as keyof DoctorData] as string}
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
                : String(doctorData[field.key as keyof DoctorData])}
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mr-4">
              <img
                src={doctorData.profileImageUrl}
                alt={`Dr. ${doctorData.fullNameEn}`}
                className="w-full h-full object-cover"
              />
              {editing && (
                <label
                  htmlFor="profile-image"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer"
                >
                  <span>Change</span>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
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
          <button
            onClick={() => setEditing(!editing)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="tabs flex justify-between mb-6">
          {["personal", "payment", "career", "documents"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } py-2 px-4 rounded-t-lg transition`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
            </button>
          ))}
        </div>

        <div className="tab-content mt-8 bg-gray-100 p-6 rounded-lg">
          {activeTab === "personal" && renderPersonalInfo()}
          {activeTab === "payment" && renderPaymentInfo()}
          {activeTab === "career" && renderCareerTimeline()}
          {activeTab === "documents" && renderDocuments()}
        </div>
      </div>
    </div>
  );
};

export default function DoctorProfilePage() {
  return (
    <DoctorProfile
      profileImageUrl="/images/doctor-profile.jpg"
      fullNameEn="Dr. Ahmed Mohamed"
      fullNameAr="د. أحمد محمد"
      specialization="Cardiology"
      clinicName="Heart Care Clinic"
    />
  );
}