"use client";
import React, { useEffect, useState } from "react";
import { FaCrown, FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

interface PremiumTestCardProps {
  testId: string;
  title: string;
  questions: number;
  description?: string;
  features?: string[];
  isPurchased?: boolean;
  price: number;
}

const PremiumTestCard: React.FC<PremiumTestCardProps> = ({
  testId,
  title,
  questions,
  description,
  features,
  isPurchased = false,
  price,
}) => {
  const router = useRouter();
  const t = useTranslations("tests");

  const purchasedTests = useSelector(
    (state: RootState) => state.auth.purchasedTests
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isTestPurchased = isMounted
    ? purchasedTests.includes(testId)
    : isPurchased;

  const defaultDescription = t("premiumCard.defaultDescription");
  const defaultFeatures = [
    t("premiumCard.features.detailedAnalysis"),
    t("premiumCard.features.expertInsights"),
    t("premiumCard.features.comprehensiveReport"),
  ];

  const handleButtonClick = () => {
    if (isTestPurchased) {
      router.push(`/tests/premium/${testId}`);
    } else {
      const query = new URLSearchParams({
        title,
        testId,
        price: price.toString(),
      }).toString();
      router.push(`/tests/premium/checkoutPremiumTest?${query}`);
    }
  };

  return (
    <div className="border rounded-2xl shadow-lg p-6 bg-white flex flex-col justify-between relative group hover:shadow-xl transition-all duration-300">
      {/* Premium Badge */}
      <div className="absolute -top-3 -end-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-2 shadow-lg">
        <FaCrown className="text-white text-lg" />
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center">
          <img
            src="/images/testcardicon.png"
            alt="icon"
            className="h-8 w-8 me-2"
          />
          <h2 className="text-xl font-semibold text-purple-800">{title}</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm">
          {description || defaultDescription}
        </p>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <FaCheck className="me-1 text-green-500" />
            {t("premiumCard.professionalAnalysis")}
          </span>
          <span>
            {questions} {t("testCard.questions")}
          </span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {(features || defaultFeatures).map((feature, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-gray-600"
            >
              <FaCheck className="me-2 text-green-500" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleButtonClick}
        className={`w-full mt-4 block ${
          isPurchased
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        } text-white text-sm font-semibold rounded-lg px-4 py-3 transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center`}
      >
        {isTestPurchased ? (
          <>
            {t("premiumCard.takeTest")}
            <FaCheck className="ms-2" />
          </>
        ) : (
          <>
            {t("premiumCard.purchaseAndTake")}
            <FaCrown className="ms-2" />
          </>
        )}
      </button>
    </div>
  );
};

export default PremiumTestCard;
