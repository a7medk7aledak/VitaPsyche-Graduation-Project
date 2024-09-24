"use client";

import React from "react";
import { motion } from "framer-motion";
import Heading from "@components/common/Heading";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { aboutUsData, doctorsData } from "@app/constants/aboutUsData";

// Define animation variants
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

const page = () => {
  return (
    <section id="about-us" className="relative">
      <div className="container mx-auto">
        {/* Animate the heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-10"
        >
          <Heading variant="secondary">Who are we?</Heading>
          <motion.h6 className="lg:w-3/4 mx-auto -mt-24 p-5 text-lg text-paragraphtext font-medium text-center">
            We are 10 engineers. Our goal is to help individuals understand
            their thoughts, feelings, and behaviors, as well as develop
            effective strategies to cope with the mental health challenges they
            face. We also seek to determine the optimal treatment method for a
            wide range of mental health conditions.
          </motion.h6>
        </motion.div>

        {/* Box of about us */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2 lg:w-3/4 mx-auto pt-36 pb-10 mt-24 relative border border-teal-700 bg-slate-300 shadow-lg"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Doctors boxes */}
          {doctorsData.map((member, indx) => (
            <motion.div
              key={indx}
              className="p-5 flex flex-col absolute -top-[100px] space-y- 1 justify-center items-center"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={member.img}
                width={150}
                height={150}
                alt={member.alt}
                className="border border-teal-700 rounded-full shadow-md mb-2"
              />
              <h4 className="text-teal-700 text-xl font-medium capitalize">
                {member.title}
              </h4>
              <p className="text-paragraphtext flex items-center gap-x-2">
                {member.role}
                <a href={member.linkedinUrl}>
                  <FaLinkedin className="text-xl text-[#55587a] hover:text-[#1e256c] transition-colors duration-150" />
                </a>
              </p>
            </motion.div>
          ))}

          {/* Members boxes */}
          {aboutUsData.map((member, indx) => (
            <motion.div
              key={indx}
              className="p-5 flex flex-col space-y-1 justify-center items-center"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={member.img}
                width={150}
                height={150}
                alt={member.alt}
                className="border border-teal-700 rounded-full shadow-md mb-2"
              />
              <h4 className="text-teal-700 text-xl font-medium capitalize">
                {member.title}
              </h4>
              <p className="text-paragraphtext flex items-center gap-x-2">
                {member.role}
                <a href={member.linkedinUrl}>
                  <FaLinkedin className="text-xl text-[#55587a] hover:text-[#1e256c] transition-colors duration-200" />
                </a>
              </p>
            </motion.div>
          ))}
        </motion.div>
        {/* End of about us box */}
      </div>
    </section>
  );
};

export default page;
