"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { navLinks } from "@app/constants/nav-links";
import { BsPersonAdd } from "react-icons/bs";
import Logo from "./Logo";
import { CiLogin } from "react-icons/ci";
import { FiLogOut, FiUser, FiHelpCircle, FiInfo } from "react-icons/fi";
import MobileNav from "./MobileNav";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@app/store/store";
import { logout } from "@app/store/authSlice";
import { getProfileRoute } from "@utils/profileRoute";
import toast from "react-hot-toast";

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
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex ${
          locale === "ar" ? "flex-row-reverse" : ""
        } items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200`}
      >
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
          {user?.first_name?.[0] || "-"}
        </div>
        <span className="text-gray-700 truncate max-w-[100px]">
          {user.first_name}
        </span>
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
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            {/* Menu Items */}
            <Link
              href={getProfileRoute(user.role as string)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FiUser className="w-4 h-4 me-3" />
              {t("profile")}
            </Link>

            <Link
              href="/help"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FiHelpCircle className="w-4 h-4 me-3" />
              {t("help")}
            </Link>

            <div className="border-t border-gray-100 mt-2">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <FiLogOut className="w-4 h-4 me-3 flip-in-rtl" />
                {t("logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// LanguageSwitcher Component
// LanguageSwitcher Component
const LanguageSwitcher: React.FC = () => {
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string): void => {
    // Check if current path starts with '/articles/'
    if (pathname.startsWith("/articles/")) {
      toast.error(
        <div>
          <p className="font-medium">{t("languageChangeAlert.title")}</p>
          <p className="text-sm mt-1">
            {t("languageChangeAlert.message")}{" "}
            <Link
              href="/articles"
              className="text-teal-600 hover:underline"
              onClick={() => toast.dismiss()}
            >
              {t("languageChangeAlert.linkText")}{" "}
            </Link>{" "}
            {t("languageChangeAlert.continuation")}{" "}
          </p>
        </div>,
        {
          duration: 5000,
          icon: <FiInfo className="text-teal-600" />,
        }
      );
      return;
    }
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="py-2 outline-none bg-transparent border border-gray-200 rounded-md hover:cursor-pointer text-gray-700"
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

// Main Navbar Component
const Navbar: React.FC = () => {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const locale = useLocale();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <motion.header
      className="w-full px-2 relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center relative py-4">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <div className="flex space-x-4 rtl:space-x-reverse">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`font-medium text-base  xl:text-lg tracking-wide px-3 py-2 transition-all hover:text-teal-700 ${
                      isActive
                        ? "border-b-2 border-teal-700 text-teal-700"
                        : "text-gray-700"
                    }`}
                  >
                    {t(link.translationKey)}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Auth Buttons */}
            <div className="ml-4 rtl:ml-0 rtl:mr-4">
              {isAuthenticated && user ? (
                <UserDropdown user={user as User} handleLogout={handleLogout} />
              ) : (
                <div className="flex items-center gap-2 ">
                  <Link href="/signin">
                    <Button variant="secondary" size="medium" roundedValue="md">
                      <span>{t("signIn")}</span>
                      <CiLogin className="flip-in-rtl" />
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="secondary" size="medium" roundedValue="md">
                      <span>{t("signUp")}</span>
                      <BsPersonAdd className="" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MobileNav
              isAuthenticated={isAuthenticated}
              username={user?.username}
              onLogout={handleLogout}
              role={user?.role}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
