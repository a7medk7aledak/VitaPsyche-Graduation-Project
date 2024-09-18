// pages/doctor-profile.tsx

"use client";
import React, { useState } from 'react';

interface DoctorProfileProps {
  fullNameEn: string;
  fullNameAr: string;
  prefix: string;
  email: string;
  phoneNumber: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  countryOfResidence: string;
  fluentLanguages: string;
  category: string;
  specialization: string;
  yearsOfExperience: string;
  licenseNumber: string;
  licensingOrganization: string;
  clinicName?: string;
  availability: string;
  cvUrl?: string;
  qualificationsUrl?: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  fullNameEn,
  fullNameAr,
  prefix,
  email,
  phoneNumber,
  username,
  dateOfBirth,
  gender,
  nationality,
  countryOfResidence,
  fluentLanguages,
  category,
  specialization,
  yearsOfExperience,
  licenseNumber,
  licensingOrganization,
  clinicName,
  availability,
  cvUrl,
  qualificationsUrl
}) => {
  const [editing, setEditing] = useState(false);
  const [doctorData, setDoctorData] = useState({
    fullNameEn,
    fullNameAr,
    prefix,
    email,
    phoneNumber,
    username,
    dateOfBirth,
    gender,
    nationality,
    countryOfResidence,
    fluentLanguages,
    category,
    specialization,
    yearsOfExperience,
    licenseNumber,
    licensingOrganization,
    clinicName,
    availability,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEditing(false);
    console.log('Updated Data:', doctorData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-2xl">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{doctorData.fullNameEn}</h1>
            <p className="text-gray-600">{doctorData.specialization} | {doctorData.clinicName}</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {editing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Personal Information */}
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Personal Information</h2>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm font-bold text-gray-700">Full Name (English):</p>
            {editing ? (
              <input
                name="fullNameEn"
                value={doctorData.fullNameEn}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.prefix} {doctorData.fullNameEn}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Full Name (Arabic):</p>
            {editing ? (
              <input
                name="fullNameAr"
                value={doctorData.fullNameAr}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.fullNameAr}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Email Address:</p>
            {editing ? (
              <input
                name="email"
                value={doctorData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.email}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Phone Number:</p>
            {editing ? (
              <input
                name="phoneNumber"
                value={doctorData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.phoneNumber}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Username:</p>
            {editing ? (
              <input
                name="username"
                value={doctorData.username}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.username}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Date of Birth:</p>
            {editing ? (
              <input
                name="dateOfBirth"
                value={doctorData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.dateOfBirth}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Gender:</p>
            {editing ? (
              <input
                name="gender"
                value={doctorData.gender}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.gender}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Nationality:</p>
            {editing ? (
              <input
                name="nationality"
                value={doctorData.nationality}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.nationality}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Country of Residence:</p>
            {editing ? (
              <input
                name="countryOfResidence"
                value={doctorData.countryOfResidence}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.countryOfResidence}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Fluent Languages:</p>
            {editing ? (
              <input
                name="fluentLanguages"
                value={doctorData.fluentLanguages}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.fluentLanguages}</p>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Professional Information</h2>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm font-bold text-gray-700">Category:</p>
            {editing ? (
              <input
                name="category"
                value={doctorData.category}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.category}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Specialization:</p>
            {editing ? (
              <input
                name="specialization"
                value={doctorData.specialization}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.specialization}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Years of Experience:</p>
            {editing ? (
              <input
                name="yearsOfExperience"
                value={doctorData.yearsOfExperience}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.yearsOfExperience}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">License Number:</p>
            {editing ? (
              <input
                name="licenseNumber"
                value={doctorData.licenseNumber}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.licenseNumber}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Licensing Organization:</p>
            {editing ? (
              <input
                name="licensingOrganization"
                value={doctorData.licensingOrganization}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.licensingOrganization}</p>
            )}
          </div>
          {doctorData.clinicName && (
            <div>
              <p className="text-sm font-bold text-gray-700">Clinic Name:</p>
              {editing ? (
                <input
                  name="clinicName"
                  value={doctorData.clinicName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              ) : (
                <p className="text-lg">{doctorData.clinicName}</p>
              )}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-700">Availability for Sessions:</p>
            {editing ? (
              <input
                name="availability"
                value={doctorData.availability}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-lg">{doctorData.availability}</p>
            )}
          </div>
        </div>

        {/* Documents Section */}
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Documents</h2>
        <div className="grid grid-cols-1 gap-4">
          {cvUrl && (
            <div>
              <p className="text-sm font-bold text-gray-700">Curriculum Vitae (CV):</p>
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View CV
              </a>
            </div>
          )}
          {qualificationsUrl && (
            <div>
              <p className="text-sm font-bold text-gray-700">Professional Qualifications:</p>
              <a href={qualificationsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View Qualifications
              </a>
            </div>
          )}
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

// Example of how to pass data into the component
export default function DoctorProfilePage() {
  const doctorData = {
    fullNameEn: 'John Doe',
    fullNameAr: 'جون دو',
    prefix: 'Dr.',
    email: 'johndoe@example.com',
    phoneNumber: '+1234567890',
    username: 'johndoe',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    nationality: 'American',
    countryOfResidence: 'USA',
    fluentLanguages: 'English, Arabic',
    category: 'Psychiatrist',
    specialization: 'Child Psychology',
    yearsOfExperience: '15',
    licenseNumber: '123456789',
    licensingOrganization: 'American Medical Board',
    clinicName: 'New York Psychiatry Clinic',
    availability: 'Mon-Fri, 9am - 5pm',
    cvUrl: '/path/to/cv.pdf',
    qualificationsUrl: '/path/to/qualifications.pdf',
  };

  return <DoctorProfile {...doctorData} />;
}
