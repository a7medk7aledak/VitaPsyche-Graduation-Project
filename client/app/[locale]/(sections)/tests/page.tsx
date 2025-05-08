"use client";

import Navbar from "@components/common/Navbar";
import PremiumTestCard from "@components/PremiumTestCard";
import TestCard from "@components/TestCard";
import React from "react";
import {
  FaCrown,
  FaCheckCircle,
  FaBrain,
  FaClipboardCheck,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import { usePaidTestData } from "@app/content/tests/paid";
import { useFreeTestData } from "@app/content/tests/free";

const TestsPage: React.FC = () => {
  const paidTests = usePaidTestData();
  const freeTests = useFreeTestData();
  const t = useTranslations("tests");

  const benefits = ["analysis", "reports", "insights", "recommendations"];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="bg-white py-16 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-full">
                  <FaBrain className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 ms-4">
                  {t("pageTitle")}
                </h1>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                {t("pageDescription")}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Free Tests Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <FaClipboardCheck className="text-green-500 text-2xl me-3" />
              <h2 className="text-3xl font-bold text-gray-800">
                {t("freeTests")}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeTests.map((test) => (
                <TestCard
                  key={test.testId}
                  testId={test.testId}
                  title={test.generalTitle}
                  questions={t(`questionCount.${test.testId}`)}
                />
              ))}
            </div>
          </div>

          {/* Premium Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
            <div className="text-center mb-10">
              <div className="inline-block bg-yellow-100 rounded-full p-3 mb-4">
                <FaCrown className="text-yellow-500 text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t("premiumTests")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("premiumDescription")}
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center bg-blue-50 rounded-full px-6 py-3 
                           transition-all hover:bg-blue-100"
                >
                  <FaCheckCircle className="text-blue-500 me-2" />
                  <span className="text-gray-700 font-medium">
                    {t(`benefits.${benefit}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Premium Test Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paidTests.map((test, index) => (
                <PremiumTestCard
                  key={index}
                  title={test.testTitle}
                  testId={test.testId}
                  questions={test.questions.length}
                  isPurchased={false}
                  price={99}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestsPage;
