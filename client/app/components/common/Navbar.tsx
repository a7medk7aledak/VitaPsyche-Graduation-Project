"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/app/constants/nav-links";
import { BsPersonAdd } from "react-icons/bs";
import Logo from "./Logo";
import { CiLogin } from "react-icons/ci";
import { FiLogOut, FiUser, FiHelpCircle } from "react-icons/fi";
import MobileNav from "./MobileNav";
import Button from "./Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { logout } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";

// Interfaces
interface User {
  first_name: string;
  last_name: string;
  email: string;
  username?: string;
  role?: "doctor" | "patient";
}

interface UserDropdownProps {
  user: User;
  handleLogout: () => void;
}

// UserDropdown Component
const UserDropdown: React.FC<UserDropdownProps> = ({ user, handleLogout }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileLink = (): void => {
    if (user.role === "doctor") {
      router.push("/my-profile");
    } else {
      router.push("/profile");
    }
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
          {user?.first_name?.[0] || "-"}
        </div>
        <span className="text-gray-700">{user.first_name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-700">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* Menu Items */}
            <button
              onClick={handleProfileLink}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FiUser className="w-4 h-4 mr-3" />
              Profile
            </button>

            <Link
              href="/help"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FiHelpCircle className="w-4 h-4 mr-3" />
              Help & Support
            </Link>

            <div className="border-t border-gray-100 mt-2">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <FiLogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Navbar Component
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [language, setLanguage] = useState<string>("en");

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setLanguage(e.target.value);
  };

  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <motion.header
      className="px-2 relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center relative py-4">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`font-medium text-lg tracking-wide px-4 py-2 min-w-14 transition-all hover:text-teal-700 ${
                    isActive
                      ? "border-b-2 border-teal-700 text-teal-700"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Selector */}
            <select
              value={language}
              onChange={handleLanguageChange}
              className="px-3 py-2 outline-none bg-transparent border border-gray-200 rounded-md hover:cursor-pointer text-gray-700"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>

            {/* Auth Buttons */}
            <div className="space-x-2 flex items-center">
              {isAuthenticated && user ? (
                <UserDropdown user={user as User} handleLogout={handleLogout} />
              ) : (
                <>
                  <Link href="/signin">
                    <Button variant="secondary" size="medium" roundedValue="md">
                      <span>Sign in</span>
                      <CiLogin className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="secondary" size="medium" roundedValue="md">
                      <span>Sign up</span>
                      <BsPersonAdd className="ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MobileNav
              isAuthenticated={isAuthenticated}
              username={user?.username}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
