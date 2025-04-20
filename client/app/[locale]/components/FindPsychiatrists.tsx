"use client";
import Image from "next/image";
import React, { useState } from "react";
import Heading from "./common/Heading";
import { countriesData } from "../constants/countriesData";
import { CiLocationOn, CiStethoscope, CiSearch } from "react-icons/ci";
import { PiMapPinArea } from "react-icons/pi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const FindPsychiatrists = () => {
  const t = useTranslations("FindPsychiatrists");
  const locale = useLocale();
  const { categories } = useSelector((state: RootState) => state.categories);

  const [filters, setFilters] = useState({
    specialization: "",
    country: "",
    governorate: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && {
        governorate: countriesData[value]?.[0] || "",
      }),
    }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filters.specialization) return;

    // Encode query parameters
    const queryParams = new URLSearchParams({
      specialization: encodeURIComponent(filters.specialization),
      country: encodeURIComponent(filters.country),
      governorate: encodeURIComponent(filters.governorate),
    }).toString();

    router.push(`/doctorList?${queryParams}`);
  };

  return (
    <section id="FindPsychiatrists" className="relative">
      <div className="container mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Heading variant="primary">{t("heading")}</Heading>
        </motion.div>

        {/* Move images outside of the animated container */}
        <Image
          src={"/images/Home/pluses.png"}
          alt="pluses"
          width={400}
          height={400}
          className={`absolute ${
            locale === "ar" ? "md:right-0 -right-1" : "md:left-0 -left-1"
          } md:top-10 top-[27rem]  -z-10`}
        />
        <Image
          src={"/images/Home/pluses.png"}
          alt="pluses"
          width={400}
          height={400}
          className={`absolute ${
            locale === "ar" ? "left-12" : "right-12"
          } md:top-0 top-6 -z-10`}
        />

        {/* search box */}
        <motion.form
          onSubmit={handleSearch}
          className="flex flex-col border-2 border-[#babfc3] rounded-md w-5/6 lg:w-fit mx-auto z-10 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div
            className={`flex flex-col lg:flex-row justify-center items-center text-center lg:text-left lg:border-b-2 px-2 py-4`}
          >
            {/* specialization field */}
            <motion.div
              className={`flex flex-col lg:border-e-2 py-2 px-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <label className="p-2 text-start text-lg text-paragraphtext">
                {t("specializationLabel")}
              </label>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <CiStethoscope className="text-3xl" />
                <select
                  name="specialization"
                  className="outline-none px-3 py-2 text-maintext w-64 lg:w-32 bg-slate-100"
                  value={filters.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("specializationPlaceholder")}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
            {/* specialization field */}

            {/* area field */}
            <motion.div
              className={`flex flex-col lg:border-e-2 p-2 px-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <label className="p-2 text-start text-lg text-paragraphtext">
                {t("areaLabel")}
              </label>
              <div className="flex space-x-2 rtl:space-x-reverse ">
                <PiMapPinArea className="text-3xl text-[#454141]" />
                <select
                  name="country"
                  className="outline-none px-3 py-2 text-maintext w-64 lg:w-32 bg-slate-100"
                  value={filters.country}
                  onChange={handleChange}
                >
                  <option value="">{t("areaPlaceholder")}</option>
                  {Object.keys(countriesData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
            {/* area field */}

            {/* governorate field */}
            <motion.div
              className={`flex flex-col lg:border-e-2 p-2 px-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <label className="p-2 text-start text-lg text-paragraphtext">
                {t("governorateLabel")}
              </label>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <CiLocationOn className="text-3xl" />
                <select
                  name="governorate"
                  className="outline-none px-3 py-2 text-maintext w-64 lg:w-32 bg-slate-100"
                  value={filters.governorate}
                  onChange={handleChange}
                >
                  <option value="">{t("governoratePlaceholder")}</option>
                  {countriesData[filters.country]?.map((governorate) => (
                    <option key={governorate} value={governorate}>
                      {governorate}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
            {/* governorate field */}

            {/* doctor field */}
            <motion.div
              className="flex flex-col p-2 px-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              <label className="p-2 text-start text-lg text-paragraphtext">
                {t("doctorLabel")}
              </label>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <Image
                  src={"/images/Home/doctorIcon.png"}
                  alt="doctor"
                  width={24}
                  height={24}
                  className=""
                />
                <select className="outline-none px-3 py-2 text-maintext w-64 lg:w-32 bg-slate-100">
                  <option value="">{t("doctorPlaceholder")}</option>
                </select>
              </div>
            </motion.div>
            {/* doctor field */}
          </div>

          {/* search button */}
          <motion.button
            type="submit"
            className="flex px-4 py-2 w-fit rounded-lg my-4 hover:bg-heading bg-[#20C0AC] cursor-pointer mx-auto shadow-md hover:shadow-lg transition-all duration-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <CiSearch className="text-4xl text-white mx-auto" />
            <h4 className="text-white text-3xl">{t("searchButton")}</h4>
          </motion.button>
          {/* search button */}
        </motion.form>
        {/* search box */}
      </div>
    </section>
  );
};

export default FindPsychiatrists;
