"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@components/common/Heading";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { aboutUsData, doctorsData } from "@app/constants/aboutUsData";
import { HiArrowSmRight, HiOutlineArrowSmDown } from "react-icons/hi";
import { useTranslations } from "next-intl";

// Define animation values
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideUpAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.4, ease: "easeInOut" } },
};

const AboutUsPage = () => {
  const t = useTranslations("AboutUs");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="about-us" className="relative">
      <div className="container mx-auto text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-10"
        >
          <Heading variant="secondary">{t("headingTitle")}</Heading>
          <motion.h6 className="lg:w-3/4 mx-auto -mt-24 p-5 text-xl text-paragraphtext font-medium text-center tracking-wide leading-relaxed">
            {t("description")}
          </motion.h6>
        </motion.div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="mx-auto flex justify-center items-center gap-x-2 mt-8 px-6 py-3 bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:bg-teal-800 transition duration-200"
        >
          {t("learnMoreButton")}
          {!isVisible ? (
            <HiArrowSmRight className="text-2xl flip-in-rtl" />
          ) : (
            <HiOutlineArrowSmDown className="text-2xl" />
          )}
        </button>

        {/* About Us Box */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="flex flex-wrap justify-center items-center gap-6 lg:w-3/4 mx-auto pt-12 pb-10 mt-8"
              variants={container}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Supervisor Section */}
              <motion.h3
                className="w-full text-start text-2xl font-medium text-teal-800"
                variants={slideUpAnimation}
              >
                {t("supervisorHeading")}
              </motion.h3>
              {doctorsData.map((member, indx) => (
                <motion.div
                  key={indx}
                  className="p-5 flex flex-col space-y-2 justify-center items-center group"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={member.img}
                    width={150}
                    height={150}
                    alt={member.alt}
                    className="border border-teal-700 group-hover:border-teal-800 rounded-full shadow-md mb-2"
                  />
                  <h4 className="text-teal-700 group-hover:text-teal-800 text-xl font-medium capitalize">
                    {member.title}
                  </h4>
                  <p className="text-paragraphtext group-hover:text-gray-600 flex items-center gap-x-2">
                    {member.role}
                    <a href={member.linkedinUrl}>
                      <FaLinkedin className="text-xl text-[#55587a] group-hover:text-[#1e256c] transition-colors duration-150" />
                    </a>
                  </p>
                </motion.div>
              ))}

              {/* Team Section */}
              <motion.h3
                className="w-full text-start text-2xl font-medium text-teal-800"
                variants={slideUpAnimation}
              >
                {t("teamHeading")}
              </motion.h3>
              {aboutUsData.map((member, indx) => (
                <motion.div
                  key={indx}
                  className="p-5 flex flex-col space-y-2 justify-center items-center group"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={member.img}
                    width={150}
                    height={150}
                    alt={member.alt}
                    className="border border-teal-700 group-hover:border-teal-800 rounded-full shadow-md mb-2"
                  />
                  <h4 className="text-teal-700 text-xl group-hover:text-teal-800 font-medium capitalize">
                    {member.title}
                  </h4>
                  <p className="text-paragraphtext flex group-hover:text-gray-600 items-center gap-x-2">
                    {member.role}
                    <a href={member.linkedinUrl}>
                      <FaLinkedin className="text-xl text-[#55587a] group-hover:text-[#1e256c] transition-colors duration-200" />
                    </a>
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutUsPage;
