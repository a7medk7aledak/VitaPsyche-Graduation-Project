"use client";

import { paidtests } from "@app/content/paid tests/data";
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

const TestsPage: React.FC = () => {
  const tests = [
    {
      title: "Depression scale",
      icon: "/path-to-depression-icon.png",
      questions: 21,
    },
    {
      title: "Anxiety scale",
      icon: "/path-to-anxiety-icon.png",
      questions: 50,
    },
    {
      title: "OCD scale",
      icon: "/path-to-ocd-icon.png",
      questions: 10,
    },
    {
      title: "PTSD scale",
      icon: "/path-to-ptsd-icon.png",
      questions: 17,
    },
    {
      title: "Rosenberg Self-Esteem Scale (RSES)",
      icon: "/path-to-adhd-icon.png",
      questions: 10,
    },
    {
      title: "Internet Addiction Scale",
      icon: "/path-to-stress-icon.png",
      questions: 20,
    },
  ];

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
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 ml-4">
                  Psychological Tests
                </h1>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                Gain insights into your mental well-being through our
                scientifically-validated assessments. Remember, these tests are
                tools for understanding, not final diagnoses.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Free Tests Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <FaClipboardCheck className="text-green-500 text-2xl mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">
                Free Assessments
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tests.map((test, index) => (
                <TestCard
                  key={index}
                  title={test.title}
                  questions={test.questions}
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
                Premium Assessments
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access our advanced psychological assessments with detailed
                professional analysis and personalized recommendations.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                "Professional Analysis",
                "Detailed Reports",
                "Expert Insights",
                "Personalized Recommendations",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-50 rounded-full px-6 py-3 
                           transition-all hover:bg-blue-100"
                >
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Premium Test Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paidtests.map((test, index) => (
                <PremiumTestCard
                  key={index}
                  title={test.testTitle}
                  testSlug={test.testSlug}
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
