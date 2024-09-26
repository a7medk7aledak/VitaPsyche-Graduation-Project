"use client";
import Image from "next/image";
import React, { useState } from "react";
import Heading from "./common/Heading";
import { countriesData } from "../constants/countriesData";
import { CiLocationOn, CiStethoscope, CiSearch } from "react-icons/ci";
import { PiMapPinArea } from "react-icons/pi";
import { motion } from "framer-motion";

const FindPsychiatrists = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Egypt");
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedGovernorate("");
  };

  const handleGovernorateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernorate(e.target.value);
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
          <Heading variant="primary">Find Psychiatrists</Heading>
        </motion.div>

        {/* Move images outside of the animated container */}
        <Image
          src={"/images/Home/pluses.png"}
          alt="pluses"
          width={400}
          height={400}
          className="absolute md:left-0 md:top-10 top-[27rem] -left-1 -z-10"
        />
        <Image
          src={"/images/Home/pluses.png"}
          alt="pluses"
          width={400}
          height={400}
          className="absolute right-12 md:top-0 top-6 -z-10"
        />

        {/* search box */}
        <motion.div
          className="border-2 border-[#babfc3] rounded-md w-5/6 lg:w-fit mx-auto z-10 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row justify-center items-center text-center lg:text-left lg:border-b-2 px-2 py-4">
            {/* specialization field */}
            <motion.div
              className="flex flex-col lg:border-r-2 py-2 px-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <label className="p-2 text-lg text-paragraphtext">
                Specialization
              </label>
              <div className="flex space-x-2">
                <CiStethoscope className="text-3xl" />
                <select className="outline-none px-3 py-2 text-maintext lg:max-w-32">
                  <option value="">--Select Specialization--</option>
                  <option value="relationShips">Relationships</option>
                  <option value="addiction">Addiction</option>
                  <option value="pre-postpartum">Pre/Postpartum</option>
                  <option value="parenting">Parenting</option>
                  <option value="cancer">Cancer</option>
                </select>
              </div>
            </motion.div>
            {/* specialization field */}

            {/* area field */}
            <motion.div
              className="flex flex-col lg:border-r-2 p-2 px-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <label className="p-2 text-lg text-paragraphtext">
                In the area
              </label>
              <div className="flex space-x-2">
                <PiMapPinArea className="text-3xl text-[#454141]" />
                <select
                  className="outline-none px-3 py-2 text-maintext"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Select the area</option>
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
              className="flex flex-col lg:border-r-2 p-2 px-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <label className="p-2 text-lg text-paragraphtext">
                In the governorate
              </label>
              <div className="flex space-x-2">
                <CiLocationOn className="text-3xl" />
                <select
                  className="outline-none px-3 py-2 text-maintext"
                  value={selectedGovernorate}
                  onChange={handleGovernorateChange}
                >
                  <option value="">-- Select Governorate --</option>
                  {countriesData[selectedCountry]?.map((governorate) => (
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
              <label className="p-2 text-lg text-paragraphtext">
                Search by name
              </label>
              <div className="flex space-x-2">
                <Image
                  src={"/images/Home/doctorIcon.png"}
                  alt="doctor"
                  width={20}
                  height={20}
                  className="w-full"
                />
                <select className="outline-none px-3 py-2 text-maintext">
                  <option value="">--Select name--</option>
                </select>
              </div>
            </motion.div>
            {/* doctor field */}
          </div>

          {/* search button */}
          <motion.div
            className="flex px-4 py-2 w-fit rounded-lg my-4 hover:bg-heading bg-[#20C0AC] cursor-pointer mx-auto shadow-md hover:shadow-lg transition-all duration-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <CiSearch className="text-4xl text-white mx-auto" />
            <h4 className="text-white text-3xl">Search</h4>
          </motion.div>
          {/* search button */}
        </motion.div>
        {/* search box */}
      </div>
    </section>
  );
};

export default FindPsychiatrists;
