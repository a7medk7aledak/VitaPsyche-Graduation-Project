"use client";
import React, { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import Button from "./Button";
import Image from "next/image";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";
import { useTranslations } from "next-intl";

// Define types for footer links
type FooterLink = string | { text: string; icon: IconType };

const Footer = () => {
  const t = useTranslations("Footer");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isFooterVisible = rect.top < windowHeight && rect.bottom > 0;

        if (isFooterVisible && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        } else if (!isFooterVisible && !hasAnimated) {
          setIsVisible(false);
        }
      }
    };

    handleScrollOrResize();
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [hasAnimated]);

  // Reusable motion component with delay parameter
  const MotionSection: React.FC<{
    children: React.ReactNode;
    delay?: number;
  }> = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );

  // Reusable footer section component - Fixed to properly handle translations
  const FooterSection: React.FC<{
    title: string;
    links: FooterLink[];
    delay: number;
  }> = ({ title, links, delay }) => (
    <MotionSection delay={delay}>
      <div className="flex flex-col text-2xl mb-12 md:mb-0">
        <h4 className="mb-6 font-medium">{t(`sections.${title}`)}</h4>
        <ul className="flex flex-col space-y-3 capitalize">
          {links.map((link, index) => (
            <li key={index}>
              {typeof link === "object" ? (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <link.icon /> <span>{link.text}</span>
                </div>
              ) : (
                link
              )}
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );

  return (
    <footer id="footer" className="relative pt-5 bg-[#dce9e6]" ref={footerRef}>
      <div className="container px-3 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between items-center">
          {/* Logo and Join Us Section */}
          <MotionSection delay={0}>
            <Logo />
            {/* Join Us */}
            <div className="mb-20">
              <h4 className="text-center mb-4 text-maintext text-2xl font-medium">
                {t("joinUs")}
              </h4>
              <div className="flex space-x-4 rtl:space-x-reverse justify-center">
                <Link href="/signup-doctor">
                  <Button variant="secondary" size="medium" roundedValue="md">
                    {t("joinAsDoctor")} <FaUserDoctor />
                  </Button>
                </Link>
                <Button variant="secondary" size="medium" roundedValue="md">
                  {t("joinAsClient")} <IoPersonSharp />
                </Button>
              </div>
            </div>
            {/* App Stores */}
            <div className="flex flex-wrap justify-center space-x-4 rtl:space-x-reverse mb-10 lg:mb-6">
              {[
                { src: "/images/Home/googlePlay.png", alt: t("googlePlay") },
                { src: "/images/Home/appStore.png", alt: t("appStore") },
              ].map((app, index) => (
                <Image
                  key={index}
                  src={app.src}
                  alt={app.alt}
                  width={150}
                  height={150}
                />
              ))}
            </div>
          </MotionSection>

          {/* Other Services Section */}
          <div className="flex flex-wrap gap-2 md:gap-8 mt-10 p-2 justify-between md:justify-center md:p-0">
            {[
              {
                title: "Products",
                links: [
                  "tests",
                  "treatYourself",
                  "aboutUs",
                  "contactUs",
                  "updates",
                ],
              },
              {
                title: "searchBy",
                links: ["doctorName", "area", "location"],
              },
              {
                title: "needHelp",
                links: [
                  "medicalLibrary",
                  "contactUs",
                  "termsOfUse",
                  "privacyPolicy",
                  "doctorsPrivacyPolicy",
                ],
              },
              {
                title: "followUs",
                links: [
                  { text: "facebook", icon: IoLogoFacebook },
                  { text: "instagram", icon: RiInstagramFill },
                  { text: "linkedin", icon: BsLinkedin },
                  { text: "youtube", icon: FaYoutube },
                ],
              },
            ].map((section, index) => (
              <FooterSection
                key={index}
                title={section.title}
                links={section.links.map((link) =>
                  typeof link === "string"
                    ? t(`links.${link}`)
                    : { text: t(`links.${link.text}`), icon: link.icon }
                )}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
        </div>
      </div>
      <h6 className="text-center text-xl mt-12">{t("copyright")}</h6>
    </footer>
  );
};

export default Footer;
