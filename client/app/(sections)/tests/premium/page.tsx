"use client";

import Navbar from "@components/common/Navbar";
import PremiumTestCard from "@components/PremiumTestCard";
import { paidtests } from "@app/content/paid tests/data";
import React from "react";
import { FaCrown, FaCheckCircle } from "react-icons/fa";

// يمكن إضافة interface لتحديد شكل البيانات

const PremiumTestsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <img
                  src="/images/testicon.png"
                  alt="premium icon"
                  className="h-12 w-12 mr-3"
                />
                <FaCrown className="absolute -top-2 -right-2 text-yellow-500 text-xl" />
              </div>
              <h1 className="text-4xl font-bold text-purple-800">
                Premium Tests
              </h1>
            </div>

            {/* Premium Benefits */}
            <div className="max-w-2xl text-center">
              <p className="text-lg text-gray-600 mb-6">
                Access our advanced psychological assessments with detailed
                professional analysis and personalized recommendations.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  "Professional Analysis",
                  "Detailed Reports",
                  "Expert Insights",
                  "Personalized Recommendations",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm"
                  >
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidtests.map((test, index) => (
              <PremiumTestCard
                key={index}
                title={test.testTitle}
                testSlug={test.testSlug}
                questions={test.questions.length}
                isPurchased={false} // This should be dynamic based on user's purchases
                price={99}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Why Choose Premium Tests?
              </h2>
              <p className="text-gray-600 mb-6">
                Get access to advanced features, detailed analysis, and
                professional insights to better understand your psychological
                well-being.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: "🔍", text: "Deep Analysis" },
                  { icon: "📊", text: "Detailed Reports" },
                  { icon: "👨‍⚕️", text: "Expert Insights" },
                  { icon: "🎯", text: "Personalized Plans" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-sm text-gray-600">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumTestsPage;
