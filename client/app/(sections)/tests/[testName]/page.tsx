"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Correct import for useRouter and useParams
import { tests } from "@app/content/free tests/data"; 
const TestPage: React.FC = () => {
  const params = useParams();
  const testName = params?.testName as string;
  const test = tests.find((t) => t.testSlug === testName);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]);
  const router = useRouter();

  if (!test || !test.questions || test.questions.length === 0) {
    return <div>No questions available for this test.</div>;
  }

  const handleNext = () => {
    if (currentPage < test.questions.length) {
      setCurrentPage(currentPage + 1);
    } else {
      const score = calculateScore();
      const answersStr = JSON.stringify(answers);
      const url = `/result?score=${score}&answers=${encodeURIComponent(
        answersStr
      )}&testSlug=${encodeURIComponent(testName)}`; // Pass testSlug as well

      router.push(url);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOptionSelect = (optionId: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage - 1] = optionId;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((total, answer, index) => {
      const question = test.questions[index];
      const selectedOption = question.options.find(
        (option) => option.optionId === answer
      );
      return total + (selectedOption?.score || 0); // Use score or 0 if undefined
    }, 0);
  };

  const currentQuestion = test.questions[currentPage - 1];

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-lg mx-auto font-sans">
      {/* Title with Image */}
      <div className="flex items-center mb-6">
        <img
          src="/images/testimg.png"
          alt="test icon"
          className="w-10 h-10 mr-4"
        />
        <h1 className="text-2xl font-bold text-blue-600">{test.testTitle}</h1>
      </div>

      {/* Instructions */}
      <p className="text-sm text-gray-500 text-center mb-6">
        Please read the test items carefully and answer based on the past two
        weeks. There's no right or wrong answer.
      </p>

      {/* Question Section */}
      <div className="w-full mb-4">
        <h2 className="text-lg font-semibold text-center mb-4">
          {currentQuestion.questionText}
        </h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <label
              key={option.optionId}
              className={`block bg-white rounded-lg border px-4 py-3 text-center cursor-pointer hover:bg-gray-200 transition ${
                answers[currentPage - 1] === option.optionId
                  ? " bg-slate-200" // Change background and text color when selected
                  : "bg-white text-black"
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.questionId}`}
                value={option.optionId}
                checked={answers[currentPage - 1] === option.optionId}
                className="hidden"
                onChange={() => handleOptionSelect(option.optionId)}
              />
              {option.optionText}
            </label>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-3 mt-4 mb-6">
        {test.questions.map((_, index) => (
          <span
            key={index}
            className={`px-3 py-1 border-b-2 cursor-pointer transition ${
              index + 1 === currentPage
                ? "text-blue-600 border-blue-600"
                : "text-black border-transparent"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>

      {/* Previous and Next Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 text-white font-semibold rounded-full px-6 py-2 hover:bg-gray-400 transition"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-teal-500 text-white font-semibold rounded-full px-6 py-2 hover:bg-teal-600 transition"
        >
          {currentPage === test.questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default TestPage;
