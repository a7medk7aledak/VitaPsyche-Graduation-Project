"use client";
import Image from "next/image";
import React from "react";
import Heading from "./common/Heading";
import { countriesData } from "../constants/countriesData";
import { useState } from "react";
import { CiLocationOn, CiStethoscope } from "react-icons/ci";
import { PiMapPinArea } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";

const FindPsychiatrists = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Egypt");
  const [selectedgovernorate, setSelectedGovernorate] = useState<string>("");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedGovernorate("");
  };

  const handleGovernorateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernorate(e.target.value);
  };
  return (
    <section id="FindPsychiatrists" className="relative">
      <div className="container mx-auto">
        <Heading variant="primary">Find psychiatrists</Heading>
        {/* search box  */}
        <div className=" border-2 border-{#babfc3}  rounded-md w-5/6 lg:w-fit mx-auto ">
          <div className="flex flex-col lg:flex-row justify-center items-center text-center lg:text-left lg:border-b-2 px-2 py-4">
            {/* specialization field */}
            <div className="flex flex-col lg:border-r-2  py-2 px-10">
              <label className="p-2 text-lg text-paragraphtext">
                Specialization
              </label>
              <div className="flex space-x-2">
                <CiStethoscope className="text-3xl" />
                <select
                  name=""
                  id=""
                  className="outline-none px-3 py-2 text-maintext  lg:max-w-32"
                >
                  <option value="">--Select Specialization--</option>
                  <option value="relationShips">Relationships</option>
                  <option value="addiction">addiction</option>
                  <option value="pre-postparetem">pre/postpartem</option>
                  <option value="parenting">parenting</option>
                  <option value="cancer">cancer</option>
                </select>
              </div>
            </div>
            {/*  specialization field */}

            {/* area field */}
            <div className="flex flex-col  lg:border-r-2  p-2 px-10">
              <label className="p-2 text-lg text-paragraphtext">
                In the area
              </label>
              <div className="flex space-x-2 ">
                <PiMapPinArea className="text-3xl text-[#454141]" />
                <select
                  name=""
                  id=""
                  className="outline-none px-3 py-2 text-maintext -none"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value=""> Select the area </option>
                  {Object.keys(countriesData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* area field */}

            {/* governorate field */}
            <div className="flex flex-col lg:border-r-2  p-2 px-10">
              <label className="p-2 text-lg text-paragraphtext">
                In the governorate
              </label>
              <div className="flex space-x-2 ">
                <CiLocationOn className="text-3xl" />
                <select
                  name=""
                  id=""
                  className="outline-none px-3 py-2 text-maintext -none"
                  value={selectedgovernorate}
                  onChange={handleGovernorateChange}
                >
                  <option value="">-- Select Governorate --</option>

                  {countriesData[selectedCountry].map((governorate) => (
                    <option key={governorate} value={governorate}>
                      {governorate}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* governorate field */}

            {/* doctor field */}
            <div className="flex flex-col p-2  px-10">
              <label className="p-2 text-lg text-paragraphtext">
                Search by name
              </label>
              <div className="flex space-x-2 ">
                <Image
                  src={"/images/Home/doctorIcon.png"}
                  alt="doctor"
                  width={20}
                  height={20}
                  className="w-full "
                />
                <select
                  name=""
                  id=""
                  className="outline-none px-3 py-2 text-maintext -none"
                >
                  <option value="">--Select name--</option>
                </select>
              </div>
            </div>
            {/* doctor field */}
          </div>

          {/* search field */}
          <div className="flex  px-4 py-2  w-fit rounded-lg my-4 hover:bg-heading bg-[#20C0AC] cursor-pointer mx-auto shadow-md hover:shadow-lg transition-all duration-200 ">
            <CiSearch className="text-4xl text-white mx-auto " />
            <h4 className="text-white text-3xl">Search</h4>
          </div>
          {/* search field */}
        </div>
        {/* search box  */}
      </div>
    </section>
  );
};

export default FindPsychiatrists;
