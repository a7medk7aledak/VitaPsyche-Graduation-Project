"use client";
import React from "react";
import Image from "next/image";
import Button from "./common/Button";
import { Link } from "@/i18n/navigation";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const Landing = () => {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <section id="home" className="relative z-30">
      <div className="container mx-auto">
        <div
          className={`flex flex-col-reverse md:flex-row space-x-6 items-center justify-between`}
        >
          {/* Text Content */}
          <motion.div
            className={`flex flex-col flex-grow justify-center text-center md:text-left md:w-1/2 p-4 relative ${
              locale === "ar" ? "lg:mr-28 lg:-mt-10" : "lg:ml-28 lg:-mt-10"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={"/images/Home/pluses.png"}
              alt="pluses"
              width={400}
              height={400}
              className={`absolute ${
                locale === "ar" ? "md:right-10 -right-5" : "md:left-10 -left-5"
              } md:bottom-1 bottom-5  -z-10`}
            />
            <Image
              src={"/images/Home/pluses.png"}
              alt="pluses"
              width={400}
              height={400}
              className={`absolute ${
                locale === "ar"
                  ? " md:left-12 left-20"
                  : " md:right-12 right-20"
              } md:-top-24 -top-48 transform rotate-90 -z-10`}
            />
            <div className="text-xl md:text-2xl font-medium text-paragraphtext mb-5 text-center tracking-wide md:px-3">
              <p className="text-subheading mb-5 text-3xl">
                {t("heroTitle")}
                <span className="text-heading">{t("title")}</span>
              </p>
              {t("heroDescription")}
            </div>
            <div className="mx-auto w-fit">
              <Link href={"/chatbot"}>
                <Button variant="secondary" size={"large"} roundedValue="full">
                  <Image
                    src={"/images/Home/talkToAi.png"}
                    width={20}
                    height={20}
                    alt="talkToAi"
                    className={`me-1`}
                  />
                  {t("chatbot")}
                </Button>
              </Link>
            </div>
          </motion.div>
          {/* Text Content */}

          {/* Image Content */}
          <motion.div
            className={`md:w-1/2 mx-auto p-4 flex justify-center`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={"/images/Home/landing.png"}
              width={600}
              height={600}
              alt="landing page"
              className="max-w-full"
            />
          </motion.div>
          {/* Image Content */}
        </div>
      </div>
    </section>
  );
};

export default Landing;
