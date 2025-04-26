"use client";
import React, { useState } from "react";
import Heading from "@components/common/Heading";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import englishFAQs from "@app/content/FAQ/en.json";
import arabicFAQs from "@app/content/FAQ/ar.json";

interface Faq {
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Select the appropriate FAQ data based on the current locale
  const FAQs = locale === "ar" ? arabicFAQs : englishFAQs;

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Heading variant="secondary">
          {locale === "ar" ? "الأسئلة المتكررة" : "Frequently Asked Questions"}
        </Heading>
      </motion.div>
      <div className="space-y-6">
        {FAQs.faqs.map((faq: Faq, index) => (
          <motion.div
            key={index}
            layout
            className="border border-gray-300 -mt-12 rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`flex justify-between items-center p-4 cursor-pointer transition duration-200 ease-in-out 
                ${
                  activeIndex === index
                    ? "bg-teal-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="font-medium text-xl">{faq.question}</h3>
              <span className="text-lg">
                {activeIndex === index ? <FaArrowUp /> : <FaArrowDown />}
              </span>
            </div>

            {/* Animate the content with smoother transitions */}
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    opacity: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white"
                  >
                    <p className="text-gray-700 text-lg">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
