"use client";

import Navbar from "@components/common/Navbar";
import TestCard from "@components/TestCard";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCrown, FaArrowRight } from "react-icons/fa";

const TestsPage: React.FC = () => {
  const router = useRouter();

  const tests = [
    {
      title: "Depression scale",
      icon: "/path-to-depression-icon.png",
      questions: 21,
    },
    {
      title: "Anxiety scale",
      icon: "/path-to-anxiety-icon.png",
      questions: 44,
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
      title: "ADHD Self-Report Scale",
      icon: "/path-to-adhd-icon.png",
      questions: 25,
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
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          {/* Header Section with Title, Icon, and Premium Button */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/images/testicon.png"
                alt="icon"
                className="h-11 w-11 mr-2"
              />
              <h1 className="text-4xl font-bold text-gray-800">Tests</h1>
            </div>

            {/* Premium Tests Button */}
            <button
              onClick={() => router.push("/tests/premium")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Premium Tests
              <FaCrown className="text-yellow-300" />
              <FaArrowRight className="text-sm" />
            </button>
          </div>

          <p className="text-center text-lg text-gray-600 mb-10">
            Do I have a mental disorder? Can tests help me? These critical tests
            help to understand the personality of a person better, as they give
            an idea about the personality and some indications of the current
            psychological state. But you should consult an expert after getting
            the results because the tests are not a substitute for them.
          </p>

          {/* Grid layout for Test Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, index) => (
              <TestCard
                key={index}
                title={test.title}
                questions={test.questions}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestsPage;
