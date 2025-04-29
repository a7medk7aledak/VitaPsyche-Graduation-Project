"use client";
import { offers } from "@app/constants/offers"; // Make sure to update this import if needed
import Button from "@components/common/Button";
import Footer from "@components/common/Footer";
import Heading from "@components/common/Heading";
import Navbar from "@components/common/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const SignupDoctor = () => {
  const t = useTranslations("signupDoctor");

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99], // Custom cubic-bezier easing
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Stagger delay between children
      },
    },
  };

  return (
    <>
      <div className="container pb-16 mx-auto relative">
        {/* Background */}
        <Image
          src={"/images/signup-doctor/signup-doctor.png"}
          alt="signup-doctor"
          fill
          className="hidden md:block absolute -z-10"
          priority
        />
        {/* Header */}
        <Navbar />

        {/* Content */}
        <motion.div
          className="pt-10 md:pt-80 text-center md:text-start pl-2 md:pl-0 lg:w-[38%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Image
            src={"/images/signup-doctor/signup-doctor.png"}
            alt="signup-doctor"
            width={500}
            height={500}
            className="md:hidden mx-auto mb-4"
          />
          <h4 className="text-maintext text-3xl tracking-wide px-4 font-bold mb-5">
            {t("hero.title")}
          </h4>
          <p className="font-medium text-lg text-[#10143B] mb-20 px-4 tracking-wide">
            {t("hero.description")}
          </p>
        </motion.div>

        <Link
          href={"/signup-doctor/doctor-form1"}
          className="flex justify-center text-xl"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleIn}
          >
            <Button variant="secondary" size="extraLarge" roundedValue="full">
              {t("cta")}
            </Button>
          </motion.div>
        </Link>
      </div>

      {/* Offers Section */}
      <section className="bg-[#daf4f1]">
        <div className="container mx-auto">
          <Heading variant="secondary">{t("offers.title")}</Heading>
          <motion.div
            className="grid gap-y-8 md:gap-x-10 lg:gap-x-20 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                className="w-[350px] h-[250px] flex flex-col items-center justify-center border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-backgroundcolor"
                variants={fadeInUp}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                  <Image
                    src={offer.img}
                    width={90}
                    height={90}
                    alt={offer.alt}
                    priority
                    className="w-auto"
                  />
                  <h4 className="text-maintext text-xl font-bold tracking-wide">
                    {t(offer.titleKey)}
                  </h4>
                </div>
                <p className="text-lg text-center leading-relaxed">
                  {t(offer.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-[#daf4f1]">
        <div className="container mx-auto">
          <div className="px-4">
            <Heading variant="secondary">{t("steps.title")}</Heading>
          </div>

          <motion.div
            className="w-4 h-[500px] md:w-[80%] md:h-4 mx-auto bg-[#10143b] relative md:mt-44 md:mb-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            {/* steps */}
            <div className="absolute -start-[150px] md:-start-[97px] rtl:md:-start-[110px] bottom-full translate-y-1/2 md:translate-y-0 md:bottom-[-50px] flex w-[350px] md:w-auto md:flex-col space-x-4 rtl:space-x-reverse md:space-x-0 md:space-y-4 items-center justify-center">
              <Image
                src={"/images/signup-doctor/join-step.png"}
                width={60}
                height={60}
                alt="join-step"
                className="w-auto"
              />
              <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                1
              </div>
              <p className="font-medium w-[100px] md:w-auto">
                {t("steps.step1")}
              </p>
            </div>
            <div className="absolute -start-[150px] md:start-[25%] bottom-[60%]  md:bottom-[-50px] flex w-[350px] md:w-auto md:flex-col space-x-4 rtl:space-x-reverse md:space-x-0 md:space-y-4 items-center justify-center">
              <Image
                src={"/images/signup-doctor/cv.png"}
                width={60}
                height={60}
                alt="cv"
                className="w-auto"
              />
              <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                2
              </div>
              <p className="font-medium w-[100px] md:w-auto">
                {t("steps.step2")}
              </p>
            </div>
            <div className="absolute -start-[150px] md:start-[60%] bottom-[25%] md:-bottom-[50px] flex w-[350px] md:w-auto md:flex-col space-x-4 rtl:space-x-reverse md:space-x-0 md:space-y-4 items-center justify-center">
              <Image
                src={"/images/signup-doctor/profile.png"}
                width={60}
                height={60}
                alt="profile"
                className="w-auto"
              />
              <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                3
              </div>
              <p className="font-medium w-[100px] md:w-auto">
                {t("steps.step3")}
              </p>
            </div>
            <div className="absolute -start-[150px]  md:start-[100%] md:-translate-x-1/2 rtl:md:translate-x-1/2 bottom-0 translate-y-1/2 md:translate-y-0 md:-bottom-[99px] rtl:md:-bottom-[75px] flex w-[350px] md:w-auto md:flex-col space-x-4 rtl:space-x-reverse md:space-x-0 md:space-y-4 items-center justify-center">
              <Image
                src={"/images/signup-doctor/calendar.png"}
                width={60}
                height={60}
                alt="join-step"
                className="w-auto"
              />
              <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                4
              </div>
              <p className="text-center font-medium w-[100px] md:w-[200px] ">
                {t("steps.step4")}
              </p>
            </div>
            {/* steps */}
          </motion.div>

          <Link
            className="flex justify-center text-xl mt-32"
            href={"/signup-doctor/doctor-form1"}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={scaleIn}
            >
              <Button variant="secondary" size="extraLarge" roundedValue="full">
                {t("cta")}
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SignupDoctor;
