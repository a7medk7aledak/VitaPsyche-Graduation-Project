"use client";
import React, { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import Button from "./Button";
import Image from "next/image";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonSharp, IoLogoFacebook } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the footer is in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
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
    <footer id="footer" className="relative pt-5 bg-[#dce9e6]" ref={footerRef}>
      <div className="container px-3 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between items-center">
          {/* Logo and Join Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Logo />
            {/* Join Us */}
            <div className="mb-20 ">
              <h4 className="text-center mb-4 text-maintext text-2xl font-medium">
                Join Us
              </h4>
              <div className="flex space-x-4 justify-center">
                <Link href={"/signup-doctor"}>
                  <Button variant="secondary" size="medium" roundedValue="md">
                    Join as a Doctor <FaUserDoctor />
                  </Button>
                </Link>
                <Button variant="secondary" size="medium" roundedValue="md">
                  Join as a Client <IoPersonSharp />
                </Button>
              </div>
            </div>
            {/* App Stores */}
            <div className="flex flex-wrap justify-center space-x-4 mb-10 lg:mb-6">
              <Image
                src={"/images/Home/googlePlay.png"}
                alt="Google Play"
                width={150}
                height={150}
              />
              <Image
                src={"/images/Home/appStore.png"}
                alt="App Store"
                width={150}
                height={150}
              />
            </div>
          </motion.div>

          {/* Other Services Section */}
          <div className="flex flex-wrap gap-4 mt-10 p-2 justify-center md:p-0 ">
            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col text-2xl mb-12 md:mb-0"
            >
              <h4 className="mb-12 font-medium">Products</h4>
              <ul className="flex flex-col space-y-3 capitalize">
                <li>Tests</li>
                <li>Treat Yourself</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Updates</li>
              </ul>
            </motion.div>
            {/* Search By */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col text-2xl"
            >
              <h4 className="mb-12 font-medium">Search By</h4>
              <ul className="flex flex-col space-y-3 capitalize">
                <li>Doctor Name</li>
                <li>Area</li>
                <li>Location</li>
              </ul>
            </motion.div>
            {/* Need Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col text-2xl ml-0 mb-10"
            >
              <h4 className="mb-12 font-medium">Need Help?</h4>
              <ul className="flex flex-col space-y-3 capitalize">
                <li>Medical Library</li>
                <li>Contact Us</li>
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
                <li className="w-[190px]">Doctors Privacy Policy</li>
              </ul>
            </motion.div>
            {/* Follow Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col text-2xl"
            >
              <h4 className="mb-12 font-medium">Follow Us</h4>
              <ul className="flex flex-col space-y-3 capitalize">
                <li className="flex items-center space-x-2">
                  <IoLogoFacebook /> <span>Facebook</span>
                </li>
                <li className="flex items-center space-x-2">
                  <RiInstagramFill /> <span>Instagram</span>
                </li>
                <li className="flex items-center space-x-2">
                  <BsLinkedin /> <span>LinkedIn</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaYoutube /> <span>YouTube</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      <h6 className="text-center text-xl -mb-12 mt-4">
        Copyright © 2024 All Rights Reserved
      </h6>
    </footer>
  );
};

export default Footer;
