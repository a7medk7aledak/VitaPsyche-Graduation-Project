"use client";

import React, { useState, useEffect, useRef } from "react";
import { SlMenu } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { BsPersonAdd } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { navLinks } from "@app/constants/nav-links";
import { getProfileRoute } from "@utils/profileRoute";

interface MobileNavProps {
  isAuthenticated: boolean;
  username?: string;
  role?: string;
  onLogout: () => void;
  locale: string; // Add locale prop
}

const MobileNav: React.FC<MobileNavProps> = ({
  isAuthenticated,
  username,
  onLogout,
  role,
  locale,
}) => {
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle language change
  const handleLanguageChange = (newLocale: string): void => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false); // Close the menu after changing language
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
      <button
        className="flex lg:hidden items-center justify-center cursor-pointer"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <SlMenu className="text-3xl" />
        )}
      </button>

      <div
        ref={menuRef}
        className={`absolute flex lg:hidden flex-col w-full bg-slate-400 left-0 z-50 text-center p-3 rounded-md shadow-lg transition-all duration-500 ease-in-out ${
          isOpen ? "top-[75px] opacity-100" : "top-[-600px] opacity-0"
        }`}
      >
        {/* Nav Links */}
        <nav className="flex flex-col">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="font-medium tracking-wide px-4 py-2 hover:text-main border-b border-[#70a7a3] hover:bg-slate-700 rounded-md transition-all"
              onClick={toggleMenu}
            >
              {t(link.translationKey)}
            </Link>
          ))}
        </nav>

        {/* Language and Account */}
        <div className="flex lg:hidden items-center flex-col-reverse">
          <select
            value={locale}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="p-2 outline-none bg-main rounded-md mr-2 w-13 h-8 hover:cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>

          <div className="space-y-2 flex flex-col mb-2 mt-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-slate-500 rounded-md">
                  <FiUser className="text-white" />
                  <span className="text-white">{username}</span>
                </div>
                <Link href={getProfileRoute(role)}>
                  <button
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center bg-subbutton text-white rounded-md px-4 py-2 hover:bg-hoversubbutton"
                  >
                    <span>{t("profile")}</span>
                    <FiUser className="ml-2" />
                  </button>
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  className="w-full flex items-center justify-center bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                >
                  <span>{t("logout")}</span>
                  <FiLogOut className="ml-2" />
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="w-full">
                  <button
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center bg-subbutton text-white rounded-md px-4 py-2 hover:bg-hoversubbutton"
                  >
                    <span>{t("signIn")}</span>
                    <CiLogin className={`ms-2 flip-in-rtl`} />
                  </button>
                </Link>
                <Link href="/signup" className="w-full">
                  <button
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center bg-subbutton text-white rounded-md px-4 py-2 hover:bg-hoversubbutton"
                  >
                    <span>{t("signUp")}</span>
                    <BsPersonAdd className="ms-2" />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
