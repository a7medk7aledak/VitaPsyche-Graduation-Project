"use client";
import ScheduleManagement from "@components/doctor/profileDoctor/ScheduleMangment";
import ServicesManagment from "@components/doctor/profileDoctor/ServicesManagment";
import Image from "next/image";
import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

interface DoctorProfileProps {
  profileImageUrl?: string;
  fullNameEn?: string;
  fullNameAr?: string;
  specialization?: string;
  clinicName?: string;
}

// interface CareerTimelineItem {
//   year: string;
//   event: string;
// }

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
  // careerTimeline: { year: string; event: string }[];
  highestDegree: string;
  institutionName: string;
  totalExperience: number;
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
    // careerTimeline: [
    //   { year: "2009", event: "Completed Psychiatry Residency" },
    //   { year: "2010", event: "Joined New York Psychiatry Clinic" },
    //   { year: "2015", event: "Specialized in Child Psychology" },
    //   { year: "2020", event: "Became Head of Child Psychiatry Department" },
    // ],
    highestDegree: "Doctor of Medicine (MD)",
    institutionName: "Harvard Medical School",
    totalExperience: 15,
  });

  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Personal");
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <p className="text-md font-bold text-gray-700">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { label: "Payment Method", key: "paymentMethod", locked: true },
        { label: "Card Type", key: "cardType", locked: true },
        { label: "Card Number", key: "cardNumber", locked: true },
        { label: "PayPal Connected", key: "paypalConnected", locked: true },
      ].map((field) => (
        <div key={field.key}>
          <p className="text-md font-bold text-gray-700">
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

  const renderCareerInfo = () => (
    <div className="mt-6">
      {" "}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Career</h2>
      <ul className="timeline">
        <li className="mb-4">
          <span className=" font-semibold  text-lg text-gray-600">
            Highest Degree Earned
          </span>
          <p className=" ">{doctorData.highestDegree}</p>
        </li>
        <li className="mb-4">
          <span className=" font-semibold text-lg text-gray-600">
            Institution
          </span>
          <p className="text-lg ">{doctorData.institutionName}</p>
        </li>
        <li className="mb-4">
          <span className=" font-semibold text-lg text-gray-600">
            Specialized In
          </span>
          <p className="text-lg ">{doctorData.specialization}</p>
        </li>
        <li className="mb-4">
          <span className=" font-semibold text-lg text-gray-600">
            Total Years of Experience
          </span>
          <p className="text-lg ">{doctorData.totalExperience} years</p>
        </li>
      </ul>
      {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Career Timeline
      </h2>
      <ul className="timeline">
        {doctorData.careerTimeline.map((item, index) => (
          <li key={index} className="mb-4">
            <span className="text-gray-600">{item.year}</span>
            <p className="text-lg font-semibold">{item.event}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );

  const renderDocuments = () => (
    <div className="mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Documents</h2>
      <div className="space-x-6 ">
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
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-8 flex justify-center items-center ">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center relative w-full">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-4">
              <Image
                src={"/images/about-us/me.jpg"}
                alt={`Dr. ${doctorData.fullNameEn}`}
                layout="fill"
                objectFit="cover"
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
            <div className="text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {doctorData.fullNameEn}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
                {doctorData.fullNameAr}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                {doctorData.specialization} | {doctorData.clinicName}
              </p>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="absolute top-2 right-2 md:static md:ml-auto text-white py-2 px-4 rounded bg-[#00bfa5] hover:bg-[#139485] transition"
            >
              {editing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className="tabs flex justify-between flex-wrap gap-y-4 mb-6">
          {[
            "Personal",
            "Payment",
            "Career",
            "Documents",
            "Services",
            "Schedule",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab ${
                activeTab === tab
                  ? "bg-subbutton  text-white"
                  : "bg-gray-200 text-gray-700"
              } py-2 px-4 rounded-t-lg transition`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
            </button>
          ))}
        </div>

        <div className=" mt-8 bg-gray-100 p-6 rounded-lg">
          {activeTab === "Personal" && renderPersonalInfo()}
          {activeTab === "Payment" && renderPaymentInfo()}
          {activeTab === "Career" && renderCareerInfo()}
          {activeTab === "Documents" && renderDocuments()}
          {activeTab === "Services" && <ServicesManagment />}
          {activeTab === "Schedule" && <ScheduleManagement />}
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
