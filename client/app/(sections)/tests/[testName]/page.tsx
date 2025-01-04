"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { tests } from "@app/content/free tests/data";
import Navbar from "@components/common/Navbar";

// Define a type for the question structure
type Question = {
  questionText: string;
  options: { optionId: number; optionText: string; score: number }[];
  questionId?: number; // Make questionId optional
};

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
    if (!answers[currentPage - 1]) {
      // Prevent moving to the next question if no answer is selected
      return;
    }
    if (currentPage < test.questions.length) {
      setCurrentPage(currentPage + 1);
    } else {
      const score = calculateScore();
      const answersStr = JSON.stringify(answers);
      const url = `/result?score=${score}&answers=${encodeURIComponent(
        answersStr
      )}&testSlug=${encodeURIComponent(testName)}`;

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
      const question = test.questions[index] as Question;
      const selectedOption = question.options.find(
        (option) => option.optionId === answer
      );
      return total + (selectedOption?.score || 0);
    }, 0);
  };

  const currentQuestion = test.questions[currentPage - 1] as Question;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6 max-w-3xl mx-auto font-sans mt-24">
        {/* Title with Image */}
        <div className="flex items-center mb-6">
          <img
            src="/images/testimg.png"
            alt="test icon"
            className="w-10 h-10 mr-4"
          />
          <h1 className="text-2xl font-bold text-hoversubbutton">
            {test.testTitle}
          </h1>
        </div>

        {/* Instructions */}
        <p className="text-sm text-gray-500 text-center mb-6">
          Please read the test items carefully and answer based on the past two
          weeks. There&apos;s no right or wrong answer.
        </p>

        {/* Question Section */}
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold text-maintext text-center mb-4">
            {currentQuestion.questionText}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.optionId}
                className={`block rounded-xl border border-button px-4 py-3 text-center cursor-pointer hover:bg-gray-200 transition ${
                  answers[currentPage - 1] === option.optionId
                    ? "bg-gray-300 text-black" // Gray background for selected option
                    : "bg-white text-black"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.questionId || currentPage}`}
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
        {/* Progress Indicator */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentPage} of {test.questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentPage / test.questions.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-600 to-green-300 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentPage / test.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 mb-6">
          <div className="flex items-center gap-1">
            {/* First page */}
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
        ${currentPage === 1 ? "bg-heading text-white" : "bg-gray-100"}
        ${
          !answers[currentPage - 1]
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-emerald-600"
        }`}
              onClick={() => answers[currentPage - 1] && setCurrentPage(1)}
              disabled={!answers[currentPage - 1]}
            >
              1
            </button>

            {/* Show dots if current page is far from start */}
            {currentPage > 4 && <span className="px-2">...</span>}

            {/* Show nearby pages */}
            {[...Array(test.questions.length)].map((_, index) => {
              const pageNumber = index + 1;
              // Show only 2 pages before and after current page
              if (
                pageNumber !== 1 &&
                pageNumber !== test.questions.length &&
                pageNumber >= currentPage - 2 &&
                pageNumber <= currentPage + 2
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
              ${
                pageNumber === currentPage
                  ? "bg-heading text-white"
                  : "bg-gray-100"
              }
              ${
                !answers[currentPage - 1]
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-100"
              }`}
                    onClick={() =>
                      answers[currentPage - 1] && setCurrentPage(pageNumber)
                    }
                    disabled={!answers[currentPage - 1]}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}

            {/* Show dots if current page is far from end */}
            {currentPage < test.questions.length - 3 && (
              <span className="px-2">...</span>
            )}

            {/* Last page */}
            {test.questions.length > 1 && (
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
          ${
            currentPage === test.questions.length
              ? "bg-heading text-white"
              : "bg-gray-100"
          }
          ${
            !answers[currentPage - 1]
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-100"
          }`}
                onClick={() =>
                  answers[currentPage - 1] &&
                  setCurrentPage(test.questions.length)
                }
                disabled={!answers[currentPage - 1]}
              >
                {test.questions.length}
              </button>
            )}
          </div>
        </div>

        {/* Previous and Next Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handlePrevious}
            className="bg-button text-white font-semibold rounded-lg px-6 py-2 hover:bg-heading transitions"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`bg-button text-white font-semibold rounded-lg px-6 py-2 hover:bg-heading transitions ${
              !answers[currentPage - 1] ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!answers[currentPage - 1]} // Disable the button if no answer is selected
          >
            {currentPage === test.questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TestPage;
