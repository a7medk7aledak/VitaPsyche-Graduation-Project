"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "./common/Button";
import Heading from "./common/Heading";
import { services } from "../constants/services";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const Services = () => {
  const t = useTranslations("Services");
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);


  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="services" className="relative" ref={sectionRef}>
      <div className="container mx-auto relative z-30 px-3 md:px-0">
        {/* Animate the heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.7 }}
        >
          <Heading variant="secondary">{t("heading")}</Heading>
        </motion.div>
        <div className={`flex gap-4 flex-wrap justify-center items-center`}>
          <Image
            src={"/images/Home/pluses.png"}
            alt="pluses"
            width={400}
            height={400}
            className={`absolute ${
              locale === "ar" ? "md:right-0" : "md:left-0"
            } md:top-10 top-[27rem] -left-1 -z-10`}
          />
          <Image
            src={"/images/Home/pluses.png"}
            alt="pluses"
            width={400}
            height={400}
            className={`absolute ${
              locale === "ar" ? "md:left-12" : "md:right-12"
            } md:top-0 top-6 -z-10`}
          />
          {/* box */}
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="w-[300px] h-[300px] flex flex-col space-y-8 border-2 p-5 text-center rounded-2xl shadow-sm hover:shadow-md transition duration-150 bg-backgroundcolor"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image
                src={service.img}
                width={100}
                height={100}
                alt={service.alt}
                className="mx-auto"
              />
              <p className="text-paragraphtext text-lg capitalize">
                {t(`serviceTitles.${service.title}`)}
              </p>
              <Link href={service.buttonLink} className="mx-auto">
                <Button variant="secondary" size="medium" roundedValue="full">
                  {t(`buttonTitles.${service.buttonTitle}`)}
                </Button>
              </Link>
            </motion.div>
          ))}
          {/* box */}
        </div>
      </div>
    </section>
  );
};

export default Services;
