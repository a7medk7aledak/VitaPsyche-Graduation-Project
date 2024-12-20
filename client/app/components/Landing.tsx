"use client";
import React from "react";
import Image from "next/image";
import Button from "./common/Button";
import Link from "next/link";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <section id="home" className="relative z-30">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row space-x-6 items-center justify-between">
          {/* textContent */}
          <motion.div
            className="flex flex-col flex-grow justify-center text-center md:text-left md:w-1/2 p-4 relative lg:ml-28 lg:-mt-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={"/images/Home/pluses.png"}
              alt="pluses"
              width={400}
              height={400}
              className="absolute md:left-10 md:bottom-1 bottom-5 -left-5 -z-10 "
            />
            <Image
              src={"/images/Home/pluses.png"}
              alt="pluses"
              width={400}
              height={400}
              className="absolute md:-top-24 md:right-12 -top-48 right-20 -z-10 transform rotate-90"
            />
            <div className="text-xl md:text-2xl font-medium text-paragraphtext mb-5 text-center  tracking-wide md:px-3">
              <p className="text-subheading mb-5 text-3xl">
                what <span className="text-heading">Vitapsyche</span> produce
              </p>
              Our platform offers personalized psychological assessments, direct
              access to doctors, a mental health product store, and educational
              content to promote awareness and self-understanding.
            </div>
            <div className="mx-auto w-fit">
              <Link href={"/chatbot"}>
                <Button variant="secondary" size={"large"} roundedValue="full">
                  <Image
                    src={"/images/Home/talkToAi.png"}
                    width={20}
                    height={20}
                    alt="talkToAi"
                  />
                  Talk to AI
                </Button>
              </Link>
            </div>
          </motion.div>
          {/* textContent */}

          {/* imageContent */}
          <motion.div
            className="md:w-1/2 mx-auto p-4 flex justify-center"
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
          {/* imageContent */}
        </div>
      </div>
    </section>
  );
};

export default Landing;
