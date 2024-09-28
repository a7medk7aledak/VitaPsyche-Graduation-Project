"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-500 ease-in-out ${
        isVisible
          ? "opacity-60 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      } hover:opacity-90`}
    >
      <button
        onClick={scrollToTop}
        className="bg-transparent p-4 rounded-full  transition-transform duration-300 hover:scale-110 flex justify-center items-center"
      >
        <Image
          src={"/images/scrollUp.png"}
          width={50}
          height={50}
          alt="scrollUp.png"
        />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
