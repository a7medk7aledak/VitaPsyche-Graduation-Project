"use client";
import React, { useEffect, useRef, useState } from "react";
import Heading from "./common/Heading";
import Button from "./common/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const AboutVitapsyche = () => {
  const t = useTranslations("AboutVitapsyche");
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
        if (!hasAnimated) {
          // Set hasAnimated to true once animation starts
          setHasAnimated(true);
        }
      } else if (!hasAnimated) {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasAnimated]);

  return (
    <section
      id="aboutVitapsyche"
      className="relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto px-3 md:px-0">
        {/* Animate the heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Heading variant="secondary" position="left">
            {t("heading")}
          </Heading>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row justify-center items-center -mt-16 xl:-mt-24 relative">
          {/* textContent */}
          <motion.div
            className="flex flex-col lg:w-1/2 space-y-5 z-10"
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : locale === "ar" ? 50 : -50,
            }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              visibility: isVisible ? "visible" : "hidden",
              minHeight: isVisible ? "auto" : "320px", // Preserve height during animation
            }}
          >
            <p className="lg:text-start text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                {t("psychologicalAssessment.title")}
              </span>{" "}
              {t("psychologicalAssessment.description")}
            </p>
            <p className="lg:text-start text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                {t("communicationWithDoctors.title")}
              </span>{" "}
              {t("communicationWithDoctors.description")}
            </p>
            <p className="lg:text-start text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                {t("doctorRecommendations.title")}
              </span>{" "}
              {t("doctorRecommendations.description")}
            </p>
            <p className="lg:text-start text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                {t("saleOfProductsAndMedicines.title")}
              </span>{" "}
              {t("saleOfProductsAndMedicines.description")}
            </p>
            <div className="mx-auto md:mx-0 md:ms-14">
              <Button variant="secondary" size="small" roundedValue="full">
                {t("showMore")}
              </Button>
            </div>
          </motion.div>

          {/* image content */}
          <motion.div
            className="mb-7 lg:pb-10 lg:w-1/2 lg:ms-28 lg:mb-0 flex-shrink z-10"
            initial={{ opacity: 0, x: locale === "ar" ? -10 : 10 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : locale === "ar" ? -10 : 10,
            }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              visibility: isVisible ? "visible" : "hidden",
              minHeight: isVisible ? "auto" : "320px", // Preserve height during animation
            }}
          >
            <Image
              src={"/images/Home/aboutVitapsyche.png"}
              width={600}
              height={600}
              alt={t("imageAlt")}
              className="max-w-full"
            />
          </motion.div>

          {/* Hidden placeholder for maintaining layout while animating */}
          {!isVisible && (
            <div className="absolute inset-0" aria-hidden="true"></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutVitapsyche;
