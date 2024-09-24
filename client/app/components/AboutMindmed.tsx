"use client";
import React, { useEffect, useRef, useState } from "react";
import Heading from "./common/Heading";
import Button from "./common/Button";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutMindmed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
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
  }, []);

  return (
    <section id="aboutMindmed" className="relative" ref={sectionRef}>
      <div className="container mx-auto px-3 md:px-0">
        {/* Animate the heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }} 
        >
          <Heading variant="secondary" position="left">
            Information about <span className="text-heading">MindMed</span>
          </Heading>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row justify-center items-center -mt-16">
          {/* textContent */}
          <motion.div
            className="flex flex-col lg:w-1/2 space-y-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.7, delay: 0.4 }} 
          >
            <p className="lg:text-left text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                Psychological assessment:{" "}
              </span>
              Through advanced psychological tests and machine learning models,
              the platform will be able to determine the user’s psychological
              state and provide recommendations based on the results.
            </p>
            <p className="lg:text-left text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                Communication with doctors:
              </span>{" "}
              The platform allows users to communicate directly with
              psychologists through an integrated chat system and book
              appointments for consultations.
            </p>
            <p className="lg:text-left text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                Doctor recommendations:{" "}
              </span>
              Provide personalized recommendations to users based on their
              psychological assessments and preferences.
            </p>
            <p className="lg:text-left text-xl p-3 lg:pr-10">
              <span className="text-maintext font-medium">
                Sale of products and medicines:{" "}
              </span>
              Provide a platform for selling products and medicines related to
              mental health and psychotherapy. Dissemination of knowledge:
              Provide articles and educational content that support mental
              health and help users understand themselves better.
            </p>
            <div>
              <Button variant="secondary" size="small" roundedValue="full">
                Show more
              </Button>
            </div>
          </motion.div>

          {/* image content */}
          <motion.div
            className="mb-7 lg:pb-10 lg:w-1/2 lg:ml-28 lg:mb-0 flex-shrink"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.7, delay: 0.5 }} 
          >
            <Image
              src={"/images/Home/aboutMindmed.png"}
              width={600}
              height={600}
              alt="aboutMindmed"
              className="max-w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMindmed;
