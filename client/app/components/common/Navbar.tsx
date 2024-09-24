"use client";
import React from "react";
import { navLinks } from "@/app/constants/nav-links";
import { BsPersonAdd } from "react-icons/bs";
import Logo from "./Logo";
import { CiLogin } from "react-icons/ci";
import MobileNav from "./MobileNav";
import Button from "./Button";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      className="px-2 relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center relative">
          {/* logo */}
          <Logo />
          {/* logo */}

          {/* nav links */}
          <nav className="hidden lg:flex">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={`${link.href}`}
                className="font-medium text-lg tracking-wide px-4 py-2 hover:text-hovernavlink min-w-14"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* nav links */}

          {/* language and account */}
          <div className="hidden lg:flex items-center space-x-6">
            <select className="p-2 outline-none bg-main rounded-md mr-2 w-13 h-8 hover:cursor-pointer">
              <option className="bg-white" value="en">
                en
              </option>
              <option className="bg-white" value="ar">
                ar
              </option>
            </select>

            <div className="space-x-2 flex">
              <Link href={"signin"}>
                <Button variant="secondary" size="medium" roundedValue="md">
                  <span>Sign in</span>
                  <CiLogin />
                </Button>
              </Link>
              <Link href={"signup"}>
                <Button variant="secondary" size="medium" roundedValue="md">
                  Sign up
                  <BsPersonAdd />
                </Button>
              </Link>
            </div>
          </div>
          {/* language and account */}

          {/* for mobile */}
          <MobileNav />
          {/* for mobile */}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
