import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import Image from "next/image";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonSharp, IoLogoFacebook } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="relative pt-5  bg-[#dce9e6]">
      <div className="container px-3 mx-auto ">
        <div className="flex flex-wrap justify-center md:justify-between items-center">
          {/* logo and join us  */}
          <div>
            <Logo />
            {/* join as */}
            <div className="mb-20">
              <h4 className="text-center mb-4 text-maintext text-2xl font-medium">
                join us
              </h4>
              <div className="flex space-x-4 justify-center  ">
                <div>
                  <Button variant="secondary" size="medium" roundedValue="md">
                    join as a doctor
                    <FaUserDoctor />
                  </Button>
                </div>
                <div>
                  <Button variant="secondary" size="medium" roundedValue="md">
                    join as a client
                    <IoPersonSharp />
                  </Button>
                </div>
              </div>
            </div>
            {/* join as */}
            {/* stores */}
            <div className="flex flex-wrap justify-center space-x-4 mb-10 lg:mb-6">
              <Image
                src={"/images/Home/googlePlay.png"}
                alt="googlePlay"
                width={150}
                height={150}
              />
              <Image
                src={"/images/Home/appStore.png"}
                alt="appStore"
                width={150}
                height={150}
              />
            </div>
            {/* stores */}
          </div>
          {/* logo and join us  */}

          {/* other services */}
          <div className="flex flex-wrap gap-4 mt-10 p-2 justify-center md:p-0 md:mt-0  ">
            {/* products */}
            <div className="flex flex-col text-2xl mb-12 md:mb-0">
              <h4 className="mb-12 font-medium">Products</h4>
              <ul className="flex flex-col space-y-3 capitalize">
                <li>tests</li>
                <li>Treat Yourself</li>
                <li>About US</li>
                <li>contact Us</li>
                <li>Updates</li>
              </ul>
            </div>
            {/* products */}
            {/* search by */}
            <div className="flex flex-col text-2xl">
              <h4 className="mb-12 font-medium">Search By</h4>
              <ul className="flex flex-col space-y-3 capitalize">
                <li>doctor name</li>
                <li>area</li>
                <li>location</li>
              </ul>
            </div>
            {/* search by  */}
            {/* need help */}
            <div className="flex flex-col text-2xl ml-0 mb-10">
              <h4 className="mb-12 font-medium">Need Help ?</h4>
              <ul className="flex flex-col space-y-3 capitalize">
                <li>Medical Library</li>
                <li>Contact Us</li>
                <li>Terms Of Use</li>
                <li>Privacy Policy</li>
                <li className="w-[190px]">Doctors Privacy Policy</li>
              </ul>
            </div>
            {/* need help */}
            {/* follow us */}
            <div className="flex flex-col text-2xl ">
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
            </div>
            {/* follow us */}
          </div>
          {/* other services */}
        </div>
      </div>
      <h6 className="text-center text-xl -mb-12 mt-4 ">
        Copyright © 2024 All Rights Reserved{" "}
      </h6>
    </footer>
  );
};

export default Footer;
