"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@components/common/Navbar";
import { FaCrown } from "react-icons/fa";
import { usePaidTestData } from "@app/content/tests/paid";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

// Define interfaces for better type safety
interface Option {
  optionId: number;
  optionText: string;
  score: number;
}

interface Question {
  questionId: number;
  questionText: string;
  options: Option[];
}

interface ScoreRange {
  range: string;
  description: string;
  color: string;
  info: string;
}

interface Test {
  testId: string;
  testTitle: string;
  testSlug: string;
  questions: Question[];
  price: number;
  scoring: {
    instruction: string;
    scoreRanges: ScoreRange[];
  };
}

const TestPage: React.FC = () => {
  const t = useTranslations("premiumTestPage");
  const paidTests = usePaidTestData();
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId as string;
  console.log("URL testId parameter:", testId);
  // تصحيح استخدام find
  const test = paidTests.find((t) => t.testId === testId) as Test | undefined;

  console.log("Test id:", test?.testId);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [answers, setAnswers] = useState<number[]>([]);

  // Early return for invalid test
  if (!test) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="flex items-center justify-center mb-4">
              <FaCrown className="text-yellow-500 text-3xl me-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                {t("notFound")}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">{t("notFoundMessage")}</p>
            <button
              onClick={() => router.push("/tests/paid")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg px-6 py-2 hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center"
            >
              <FaCrown className="me-2 text-yellow-300" />
              {t("returnToPremium")}
            </button>
          </div>
        </div>
      </>
    );
  }

  // Early return for empty questions
  if (!test.questions || test.questions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="flex items-center justify-center mb-4">
              <FaCrown className="text-yellow-500 text-3xl me-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                {t("underMaintenance")}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">{t("underMaintenanceMessage")}</p>
            <button
              onClick={() => router.push("/tests/paid")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg px-6 py-2 hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center"
            >
              <FaCrown className="me-2 text-yellow-300" />
              {t("returnToPremium")}
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleNext = (): void => {
    if (!answers[currentPage - 1]) return;

    if (currentPage < test.questions.length) {
      setCurrentPage(currentPage + 1);
    } else {
      const score = calculateScore();
      const answersStr = JSON.stringify(answers);
      const url = `/result?score=${score}&answers=${encodeURIComponent(
        answersStr
      )}&testId=${testId}&isPremium=true`;

      router.push(url);
    }
  };

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOptionSelect = (optionId: number): void => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage - 1] = optionId;
    setAnswers(updatedAnswers);
  };

  const calculateScore = (): number => {
    return answers.reduce((total: number, answer: number, index: number) => {
      const question = test.questions[index];
      const selectedOption = question.options.find(
        (option: Option) => option.optionId === answer
      );
      return total + (selectedOption?.score || 0);
    }, 0);
  };

  const currentQuestion = test.questions[currentPage - 1];
  const percentage = Math.round((currentPage / test.questions.length) * 100);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6 max-w-3xl mx-auto font-sans mt-24">
        {/* Premium Badge */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full mb-6 flex items-center">
          <FaCrown className="text-yellow-300 me-2" />
          <span>{t("premiumBadge")}</span>
        </div>

        {/* Title with Image */}
        <div className="flex items-center mb-6">
          <img
            src="/images/testimg.png"
            alt="test icon"
            className="w-10 h-10 me-4"
          />
          <h1 className="text-2xl font-bold text-purple-800">
            {test.testTitle}
          </h1>
        </div>

        {/* Instructions */}
        <p className="text-sm text-gray-500 text-center mb-6">
          {t("instructions")}
        </p>

        {/* Question Section */}
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
            {currentQuestion.questionText}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option: Option) => (
              <label
                key={option.optionId}
                className={`block rounded-xl border border-purple-200 px-4 py-3 text-center cursor-pointer hover:bg-purple-50 transition ${
                  answers[currentPage - 1] === option.optionId
                    ? "bg-purple-100 border-purple-500"
                    : "bg-white"
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
        <div className="flex justify-center mt-4 mb-6">
          <div className="flex items-center gap-1">
            {/* First page */}
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
        ${currentPage === 1 ? "bg-purple-600 text-white" : "bg-gray-100"}
        ${
          !answers[currentPage - 1]
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-purple-100"
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
                  ? "bg-purple-600 text-white"
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
              ? "bg-purple-600 text-white"
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
        {/* Progress Indicator */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              {t("questionCounter", {
                currentPage,
                totalQuestions: test.questions.length,
              })}
            </span>
            <span className="text-sm text-gray-600">
              {t("complete", { percentage })}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentPage / test.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 rtl:space-x-reverse mt-6">
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white font-semibold rounded-lg px-6 py-2 hover:bg-gray-600 transition-all"
            disabled={currentPage === 1}
          >
            {t("previous")}
          </button>
          <button
            onClick={handleNext}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg px-6 py-2 hover:from-purple-700 hover:to-indigo-700 transition-all ${
              !answers[currentPage - 1] ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!answers[currentPage - 1]}
          >
            {currentPage === test.questions.length ? t("finish") : t("next")}
          </button>
        </div>
      </div>
    </>
  );
};

export default TestPage;
