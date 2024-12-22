import Navbar from "@components/common/Navbar";
import TestCard from "@components/TestCard";
import React from "react";

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
          {/* Title with Icon */}
          <div className="flex items-center justify-center mb-6">
            <img
              src="/images/testicon.png"
              alt="icon"
              className="h-11 w-11 mr-2"
            />
            <h1 className="text-4xl font-bold text-gray-800">Tests</h1>
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
                icon={test.icon}
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
