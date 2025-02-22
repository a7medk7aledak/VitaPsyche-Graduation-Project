"use client";
import { Suspense, useCallback } from "react";
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
import ServiceCard from "@components/doctor/serviceCard";
import useAxios from "@hooks/useAxios";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { useCategoryLookup } from "@utils/categoryLookup";
import withAuth from "@components/auth/WithAuth";

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
  is_active: boolean; // New field
};

type Service = {
  id: number;
  doctor: number;
  name: string;
  doctor_name?: string;
  description: string;
  price: string;
  duration: string;
  category: number;
  is_active: boolean;
};

function DoctorList() {
  const getCategory = useCategoryLookup();
  const searchParams = useSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);

  const specializationFromURL = decodeURIComponent(
    searchParams?.get("specialization") || ""
  );
  const countryFromURL = decodeURIComponent(searchParams?.get("country") || "");

  const buildFilterQuery = (filters: Filters): string => {
    const queryParams = new URLSearchParams();

    // // Handle availability
    // if (filters.availability.length > 0) {
    //   if (filters.availability.includes("Today")) {
    //     const today = new Date().toISOString().split("T")[0];
    //     queryParams.append("available_date", today);
    //   }
    //   if (filters.availability.includes("This Week")) {
    //     const today = new Date();
    //     const endOfWeek = new Date(today);
    //     endOfWeek.setDate(today.getDate() + 7);
    //     queryParams.append(
    //       "available_until",
    //       endOfWeek.toISOString().split("T")[0]
    //     );
    //   }
    // }

    // // Handle specific date
    // if (filters.specificDate) {
    //   queryParams.append("specific_date", filters.specificDate);
    // }

    // Handle specialization
    if (filters.specialization) {
      const categoryId = getCategory(filters.specialization) as string;
      queryParams.append("category_id", categoryId);
    }

    // Handle session duration
    if (filters.sessionDuration.length > 0) {
      const durations = filters.sessionDuration.map(
        (duration) => duration.split(" ")[0] // Convert "30 Min" to "30"
      );
      queryParams.append("duration_min", durations.join(","));
    }

    // // Handle gender
    // if (filters.gender) {
    //   queryParams.append("gender", filters.gender);
    // }

    // // Handle rating
    // if (filters.rating > 0) {
    //   queryParams.append("min_rating", filters.rating.toString());
    // }

    // // Handle language
    // if (filters.language) {
    //   queryParams.append("language", filters.language);
    // }

    // // Handle country
    // if (filters.country) {
    //   queryParams.append("country", filters.country);
    // }

    // Handle session price range
    if (filters.sessionRange) {
      const [min, max] = filters.sessionRange.split("-");
      queryParams.append("price_min", min);
      queryParams.append("price_max", max);
    }

    // // Handle promocode acceptance
    // if (filters.promocodeAccepted) {
    //   queryParams.append("accepts_promocode", filters.promocodeAccepted);
    // }

    queryParams.append("is_active", filters.is_active.toString());

    return queryParams.toString();
  };

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
    is_active: true, // Default value
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [services, setServices] = useState<Service[]>([]); // State to store services
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const axiosInstance = useAxios();

  const fetchServices = useCallback(
    async (currentFilters: Filters) => {
      setLoading(true);
      try {
        const queryString = buildFilterQuery(currentFilters);
        const endpoint = `/api/filterServices/${
          queryString ? `?${queryString}` : ""
        }`;
        const response = await axiosInstance.get(endpoint);
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance]
  );

  useEffect(() => {
    fetchServices(filters);
  }, [fetchServices]);

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRating = (rate: number) => {
    setFilters((prev) => ({ ...prev, rating: rate }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm("");
    fetchServices(defaultFilters);
  };

  const applyFilters = () => {
    fetchServices(filters);
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.doctor_name &&
        service.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full h-fit lg:w-1/4 bg-white shadow p-4 rounded">
            <h3 className="text-xl py-2 text-center border-b-2 border-gray-400 font-semibold text-gray-700 mb-4">
              Filters
            </h3>
            <form>
              {" "}
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
              <div className="mb-4 flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaTag className="mr-2" />
                  Active Services Only
                </label>
                <input
                  type="checkbox"
                  className="w-4 h-4  cursor-pointer"
                  onChange={(e) =>
                    handleFilterChange("is_active", e.target.checked)
                  }
                  checked={filters.is_active}
                />
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
          {loading ? (
            <div className="flex justify-center items-center w-full min-h-[300px]">
              <SpinnerLoading message="loading services" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          )}

          {/* list of doctor cards */}
        </div>
      </main>
    </>
  );
}

function DoctorListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorList />
    </Suspense>
  );
}

export default withAuth(DoctorListPage);
