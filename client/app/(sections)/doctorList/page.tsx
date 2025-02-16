"use client";
import { Suspense } from "react";
import DoctorCard from "@components/doctor/doctorCard";
import { countries } from "@constants/countries";
import { languageOptions } from "@constants/doctorLanguages";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FaCalendarAlt,
  FaUserMd,
  FaVenusMars,
  FaGlobe,
  FaStar,
  FaClock,
  FaTag,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

// Define the types for the filters
type Filters = {
  availability: string[];
  specificDate: string | null;
  specialization: string;
  sessionDuration: string[];
  gender: string;
  rating: number;
  language: string;
  country: string;
  sessionRange: string;
  promocodeAccepted: string;
};

function DoctorList() {
  const searchParams = useSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);

  const specializationFromURL = decodeURIComponent(
    searchParams?.get("specialization") || ""
  );
  const countryFromURL = decodeURIComponent(searchParams?.get("country") || "");

  const defaultFilters: Filters = {
    availability: [],
    specificDate: null,
    specialization: specializationFromURL,
    sessionDuration: [],
    gender: "",
    rating: 0,
    language: "",
    country: countryFromURL,
    sessionRange: "",
    promocodeAccepted: "",
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      specialization: specializationFromURL,
      country: countryFromURL,
    }));
  }, [specializationFromURL, countryFromURL]);

  const handleFilterChange = (key: keyof Filters, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (key: keyof Filters, option: string) => {
    setFilters((prev) => {
      const current = prev[key] as string[];
      return {
        ...prev,
        [key]: current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option],
      };
    });
  };

  const handleRating = (rate: number) => {
    setFilters((prev) => ({ ...prev, rating: rate }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  const applyFilters = () => {
    console.log(filters);
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl capitalize w-full md:w-1/2 mx-auto font-medium text-subheading text-center mb-8">
          Discover the Right Therapist to Guide Your Mental Health Journey
        </h2>
        <div className="relative w-5/6 mx-auto mb-6">
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-11 text-xl outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:placeholder-gray-400"
            required
            placeholder="Search here"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full h-fit lg:w-1/4 bg-white shadow p-4 rounded">
            <h3 className="text-xl py-2 text-center border-b-2 border-gray-400 font-semibold text-gray-700 mb-4">
              Filters
            </h3>
            <form>
              {/* Availability */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Availability
                </label>
                <div className="flex space-x-4">
                  {["Today", "This Week"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() =>
                          handleCheckboxChange("availability", option)
                        }
                        checked={filters.availability.includes(option)}
                      />{" "}
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specific Date */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <MdDateRange className="mr-2" />
                  Specific date or range
                </label>
                <input
                  type="date"
                  className="w-full p-1 bg-[#efefef] text-md outline-none text-gray-900"
                  onChange={(e) =>
                    handleFilterChange("specificDate", e.target.value)
                  }
                  value={filters.specificDate || ""}
                />
              </div>

              {/* Specialization */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FaUserMd className="mr-2" />
                  Areas of Interest
                </label>
                <select
                  className="mt-1 p-1  w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("specialization", e.target.value)
                  }
                  value={filters.specialization}
                  disabled={!!specializationFromURL} // Disable if value is from URL
                >
                  <option value="">Select Specialization</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Session Duration */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FaClock className="mr-2" />
                  Session Duration
                </label>
                <div className="flex space-x-4">
                  {["30 Min", "60 Min"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() =>
                          handleCheckboxChange("sessionDuration", option)
                        }
                        checked={filters.sessionDuration.includes(option)}
                      />{" "}
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FaVenusMars className="mr-2" />
                  Therapist Gender
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                  value={filters.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Ratings */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FaStar className="mr-2" />
                  Ratings
                </label>
                <div className="flex space-x-1 mt-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <button
                      key={index + 1}
                      type="button"
                      onClick={() => handleRating(index + 1)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        size={24}
                        className={
                          index + 1 <= filters.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Rating: {filters.rating}
                </p>
              </div>

              {/* Language and Country */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FaGlobe className="mr-2" />
                  Language & Country
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("language", e.target.value)
                  }
                  value={filters.language}
                >
                  <option value="">Select Language</option>
                  {languageOptions.map((lang, index) => (
                    <option key={index} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("country", e.target.value)
                  }
                  value={filters.country}
                  disabled={!!countryFromURL} // Disable if value is from URL
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Session Range */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <BiMoney className="mr-2" />
                  Session Range
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("sessionRange", e.target.value)
                  }
                  value={filters.sessionRange}
                >
                  <option value="">Range</option>
                  <option value="0-500">0-500</option>
                  <option value="500-1000">500-1000</option>
                  <option value="1000-1500">1000-1500</option>
                  <option value="1500-2000">1500-2000</option>
                </select>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FaTag className="mr-2" />
                  Accept Promocodes
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("promocodeAccepted", e.target.value)
                  }
                  value={filters.promocodeAccepted}
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-x-6">
                <button
                  type="button"
                  onClick={applyFilters}
                  className="px-4 py-2 text-lg rounded-md btn shadow-md hover:shadow-lg btn-secondary mt-8"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 text-lg rounded-md btn shadow-md hover:shadow-lg btn-secondary mt-8"
                >
                  Reset Filters
                </button>
              </div>
            </form>
          </aside>

          {/* list of doctor cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index}>
                <DoctorCard />
              </div>
            ))}{" "}
          </div>
          {/* list of doctor cards */}
        </div>
      </main>
    </>
  );
}

export default function DoctorListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorList />
    </Suspense>
  );
}
