"use client";
import React, { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { navLinks } from "../constants/nav-links";
import { BsPersonAdd } from "react-icons/bs";

import { CiLogin } from "react-icons/ci";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex md:hidden cursor-pointer " onClick={toggleMenu}>
        {isOpen ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <SlMenu className="text-3xl" />
        )}
      </div>
      {isOpen && (
        <div className="absolute flex md:hidden flex-col w-full bg-slate-400 left-0 top-[87px] z-50 text-center p-3 rounded-md shadow-lg">
          {/* nav links */}
          <nav className="flex flex-col ">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={`${link.href}`}
                className="font-medium tracking-wide px-4 py-2 hover:text-main border-b border-[#70a7a3] hover:bg-slate-700 rounded-md transition-all"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* nav links */}

          {/* language and accound */}
          <div className="flex md:hidden items-center  flex-col-reverse">
            <select
              className="p-2 outline-none bg-main rounded-md mr-2 w-13 h-8 hover:cursor-pointer
           "
            >
              <option className="bg-white " value="en">
                en
              </option>
              <option className="bg-white " value="ar">
                ar
              </option>
            </select>

            <div className="space-x-2 flex mb-2 mt-2">
              <Link href="signin">
                <button className="flex items-center bg-subbutton text-white rounded-md px-4 py-2 hover:bg-hoversubbutton">
                  <span>Sign in</span>

                  <CiLogin />
                </button>
              </Link>
              <Link href="signup">
                <button className="flex items-center bg-subbutton text-white rounded-md px-4 py-2 hover:bg-hoversubbutton">
                  <span>Sign up</span>
                  <BsPersonAdd />
                </button>
              </Link>
            </div>
          </div>
          {/* language and account */}
        </div>
      )}
    </>
  );
};

export default MobileNav;
