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
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";

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
  image?: string;
};

function DoctorList() {
  const t = useTranslations(); // Initialize translation
  const getCategory = useCategoryLookup();
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
    is_active: false, // Default value
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [services, setServices] = useState<Service[]>([]); // State to store services
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const axiosInstance = useAxios();

  const buildFilterQuery = (filters: Filters): string => {
    const queryParams = new URLSearchParams();

    // Handle specialization
    if (filters.specialization) {
      const categoryId = getCategory(filters.specialization) as string;
      queryParams.append("category_id", categoryId);
    }

    // Handle session duration (avoid sending if both 30 Min & 60 Min are selected)
    if (
      filters.sessionDuration.length > 0 &&
      !(
        filters.sessionDuration.includes(
          t("doctorList.filters.sessionDuration.thirtyMin")
        ) &&
        filters.sessionDuration.includes(
          t("doctorList.filters.sessionDuration.sixtyMin")
        )
      )
    ) {
      const durations = filters.sessionDuration.map(
        (duration) => duration.split(" ")[0] // Convert "30 Min" to "30"
      );
      queryParams.append("duration_min", durations.join(","));
    }

    // Handle session price range
    if (filters.sessionRange) {
      const [min, max] = filters.sessionRange.split("-");
      queryParams.append("price_min", min);
      queryParams.append("price_max", max);
    }

    if (filters.is_active) {
      queryParams.append("is_active", filters.is_active.toString());
    }
    return queryParams.toString();
  };

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
        if (isAxiosError(error)) {
          // The server's processed error (from axiosErrorHandler) is now in err.response
          const { status, data } = error.response || {
            status: 500,
            data: { message: "Unknown error occurred" },
          };
          console.error(`Error (${status}):`, data);
        }
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, t]
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
          {t("doctorList.pageTitle")}
        </h2>
        <div className="sticky top-2 w-5/6 mx-auto mb-6 z-40">
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-11 text-xl outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:placeholder-gray-400"
            required
            placeholder={t("doctorList.searchPlaceholder")}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:sticky lg:top-20 w-full h-fit lg:w-1/4 bg-white shadow p-4 rounded">
            <h3 className="text-xl py-2 text-center border-b-2 border-gray-400 font-semibold text-gray-700 mb-4">
              {t("doctorList.filters.title")}
            </h3>
            <form>
              {/* Availability */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaCalendarAlt className="me-2" />
                  {t("doctorList.filters.availability.label")}
                </label>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  {[
                    t("doctorList.filters.availability.today"),
                    t("doctorList.filters.availability.thisWeek"),
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() =>
                          handleCheckboxChange("availability", option)
                        }
                        checked={filters.availability.includes(option)}
                      />{" "}
                      <span className="ms-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Specific Date */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MdDateRange className="me-2" />
                  {t("doctorList.filters.specificDate.label")}
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
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaUserMd className="me-2" />
                  {t("doctorList.filters.areasOfInterest.label")}
                </label>
                <select
                  className="mt-1 p-1 w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("specialization", e.target.value)
                  }
                  value={filters.specialization}
                  disabled={!!specializationFromURL} // Disable if value is from URL
                >
                  <option value="">
                    {t("doctorList.filters.areasOfInterest.selectPrompt")}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Session Duration */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaClock className="me-2" />
                  {t("doctorList.filters.sessionDuration.label")}
                </label>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  {[
                    t("doctorList.filters.sessionDuration.thirtyMin"),
                    t("doctorList.filters.sessionDuration.sixtyMin"),
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() =>
                          handleCheckboxChange("sessionDuration", option)
                        }
                        checked={filters.sessionDuration.includes(option)}
                      />{" "}
                      <span className="ms-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Gender */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaVenusMars className="me-2" />
                  {t("doctorList.filters.therapistGender.label")}
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                  value={filters.gender}
                >
                  <option value="">
                    {t("doctorList.filters.therapistGender.selectPrompt")}
                  </option>
                  <option value="male">
                    {t("doctorList.filters.therapistGender.male")}
                  </option>
                  <option value="female">
                    {t("doctorList.filters.therapistGender.female")}
                  </option>
                </select>
              </div>
              {/* Ratings */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaStar className="me-2" />
                  {t("doctorList.filters.ratings.label")}
                </label>
                <div className="flex space-x-1 rtl:space-x-reverse mt-1">
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
                  {t("doctorList.filters.ratings.ratingText")}: {filters.rating}
                </p>
              </div>
              {/* Language and Country */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaGlobe className="me-2" />
                  {t("doctorList.filters.languageAndCountry.label")}
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("language", e.target.value)
                  }
                  value={filters.language}
                >
                  <option value="">
                    {t("doctorList.filters.languageAndCountry.selectLanguage")}
                  </option>
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
                  <option value="">
                    {t("doctorList.filters.languageAndCountry.selectCountry")}
                  </option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              {/* Session Range */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <BiMoney className="me-2" />
                  {t("doctorList.filters.sessionRange.label")}
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("sessionRange", e.target.value)
                  }
                  value={filters.sessionRange}
                >
                  <option value="">
                    {t("doctorList.filters.sessionRange.selectPrompt")}
                  </option>
                  <option value="0-500">
                    {t("doctorList.filters.sessionRange.range1")}
                  </option>
                  <option value="500-1000">
                    {t("doctorList.filters.sessionRange.range2")}
                  </option>
                  <option value="1000-1500">
                    {t("doctorList.filters.sessionRange.range3")}
                  </option>
                  <option value="1500-2000">
                    {t("doctorList.filters.sessionRange.range4")}
                  </option>
                </select>
              </div>
              {/* Promo Code */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaTag className="me-2" />
                  {t("doctorList.filters.promoCode.label")}
                </label>
                <select
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleFilterChange("promocodeAccepted", e.target.value)
                  }
                  value={filters.promocodeAccepted}
                >
                  <option value="">
                    {t("doctorList.filters.promoCode.selectPrompt")}
                  </option>
                  <option value="true">
                    {t("doctorList.filters.promoCode.yes")}
                  </option>
                  <option value="false">
                    {t("doctorList.filters.promoCode.no")}
                  </option>
                </select>
              </div>
              <div className="mb-4 flex items-center space-x-4 rtl:space-x-reverse">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaTag className="me-2" />
                  {t("doctorList.filters.activeServices.label")}
                </label>
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
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
                  {t("doctorList.filters.buttons.apply")}
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 text-lg rounded-md btn shadow-md hover:shadow-lg btn-secondary mt-8"
                >
                  {t("doctorList.filters.buttons.reset")}
                </button>
              </div>
            </form>
          </aside>
          {/* list of doctor cards */}
          {loading ? (
            <div className="flex justify-center items-center w-full min-h-[300px]">
              <SpinnerLoading message={t("doctorList.loading")} />
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-red-400 text-3xl">
                {t("doctorList.noServices")}
              </p>
            </div>
          )}
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
