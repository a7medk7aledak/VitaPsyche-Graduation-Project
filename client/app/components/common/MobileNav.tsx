"use client";
import React, { useState, useEffect, useRef } from "react";
import { SlMenu } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { navLinks } from "@app/constants/nav-links";
import { BsPersonAdd } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the menu element

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isOpen ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <SlMenu className="text-3xl" />
        )}
      </div>

      <div
        ref={menuRef}
        className={`absolute flex lg:hidden flex-col w-full bg-slate-400 left-0 z-50 text-center p-3 rounded-md shadow-lg transition-all duration-500 ease-in-out ${
          isOpen ? "top-[70px] opacity-100" : "top-[-400px] opacity-0"
        }`}
      >
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

        {/* language and account */}
        <div className="flex lg:hidden items-center flex-col-reverse">
          <select className="p-2 outline-none bg-main rounded-md mr-2 w-13 h-8 hover:cursor-pointer">
            <option className="bg-white " value="en">
              en
            </option>
            <option className="bg-white " value="ar">
              ar
            </option>
          </select>

          <div className="space-x-2 flex mb-2 mt-2">
            <Link href="/signin">
              <button className="flex items-center bg-subbutton text-white rounded-md px-4 py-2 hover:bg-hoversubbutton">
                <span>Sign in</span>
                <CiLogin />
              </button>
            </Link>
            <Link href="/signup">
              <button className="flex items-center bg-subbutton text-white rounded-md px-4 py-2 hover:bg-hoversubbutton">
                <span>Sign up</span>
                <BsPersonAdd />
              </button>
            </Link>
          </div>
        </div>
        {/* language and account */}
      </div>
    </>
  );
};

export default MobileNav;
