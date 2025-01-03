"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { tests } from "@app/content/free tests/data";
import { paidtests } from "@app/content/paid tests/data";
import Navbar from "@components/common/Navbar";
import { FaCrown } from "react-icons/fa";

interface Option {
  optionId: number;
  optionText: string;
  score: number;
}

interface Question {
  questionId?: number;
  questionText: string;
  options: Option[];
}

interface TestScoring {
  instruction?: string;
  scoreRanges?: {
    range: string;
    description: string;
    color: string;
    info: string;
  }[];
}

interface Test {
  testTitle: string;
  testSlug: string;
  questions: Question[];
  scoring: TestScoring;
  isPremium?: boolean;
}

function calculateMaxScore(questions: Question[]): number {
  return questions.reduce((max, question) => {
    const maxOptionScore = Math.max(
      ...question.options.map((opt) => opt.score)
    );
    return max + maxOptionScore;
  }, 0);
}

function calculatePTSDScore(answers: number[], questions: Question[]): string {
  let reexperienceCount = 0;
  let avoidanceCount = 0;
  let arousalCount = 0;

  answers.forEach((answer, index) => {
    const option = questions[index].options.find(
      (opt) => opt.optionId === answer
    );
    if (option && option.score >= 1) {
      if ([0, 1, 2, 3, 16].includes(index)) {
        reexperienceCount++;
      } else if ([4, 5, 6, 7, 8, 9, 10].includes(index)) {
        avoidanceCount++;
      } else if ([11, 12, 13, 14, 15].includes(index)) {
        arousalCount++;
      }
    }
  });

  const hasPTSD =
    reexperienceCount >= 1 && avoidanceCount >= 3 && arousalCount >= 1;

  return hasPTSD ? "You have PTSD." : "You don't have PTSD.";
}

const ClientSideResult: React.FC = () => {
  const [test, setTest] = useState<Test | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [detailedInfo, setDetailedInfo] = useState("");
  const [maxScore, setMaxScore] = useState(0);

  const searchParams = useSearchParams();
  const testSlug = searchParams?.get("testSlug");
  const answersStr = searchParams?.get("answers");
  const isPremium = searchParams?.get("isPremium") === "true";

  useEffect(() => {
    if (testSlug) {
      const selectedTest = isPremium
        ? paidtests.find((t) => t.testSlug === testSlug)
        : tests.find((t) => t.testSlug === testSlug);

      if (selectedTest) {
        setTest({ ...selectedTest, isPremium });
        setUserAnswers(JSON.parse(answersStr || "[]"));
      }
    }
  }, [testSlug, answersStr, isPremium]);

  useEffect(() => {
    if (test && userAnswers.length > 0) {
      if (test.testSlug === "ptsd-scale") {
        const feedbackText = calculatePTSDScore(userAnswers, test.questions);
        setFeedback(feedbackText);
      } else {
        let totalScore = 0;
        test.questions.forEach((question, index) => {
          const userAnswer = userAnswers[index];
          const option = question.options.find(
            (opt) => opt.optionId === userAnswer
          );
          if (option && option.score !== undefined) {
            totalScore += option.score;
          }
        });

        setScore(totalScore);

        const { feedbackText, detailedExplanation } = getFeedback(
          totalScore,
          test.scoring.scoreRanges
        );
        setFeedback(feedbackText);
        setDetailedInfo(detailedExplanation);
      }

      const calculatedMaxScore = calculateMaxScore(test.questions);
      setMaxScore(calculatedMaxScore);
    }
  }, [test, userAnswers]);

  const getFeedback = (
    score: number,
    scoreRanges?: { range: string; description: string; info: string }[]
  ): { feedbackText: string; detailedExplanation: string } => {
    if (!scoreRanges)
      return {
        feedbackText: "No feedback available.",
        detailedExplanation: "",
      };
    for (const range of scoreRanges) {
      const [min, max] = range.range.split("-").map(Number);
      if (score >= min && score <= max) {
        return {
          feedbackText: range.description,
          detailedExplanation: range.info,
        };
      }
    }
    return { feedbackText: "Score out of range.", detailedExplanation: "" };
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header
          className={`w-full ${
            test.isPremium
              ? "bg-gradient-to-r from-purple-700 to-indigo-600"
              : "bg-gradient-to-r from-green-700 to-green-600"
          } py-8 px-4 mt-16 shadow-lg`}
        >
          <div className="flex items-center justify-center gap-2">
            {test.isPremium && <FaCrown className="text-yellow-300 text-2xl" />}
            <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
              {test.testTitle}
            </h1>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-700 mb-4">
              Your Result
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-baseline">
                <span
                  className={`text-4xl md:text-5xl font-bold ${
                    test.isPremium ? "text-purple-600" : "text-blue-600"
                  }`}
                >
                  {test.testSlug === "ptsd-scale" ? score : score}
                </span>
                {test.testSlug !== "ptsd-scale" && (
                  <span className="text-4xl md:text-5xl text-black ml-1">
                    /{maxScore}
                  </span>
                )}
              </div>
              <div
                className={`text-xl md:text-2xl font-semibold ${
                  test.isPremium ? "text-purple-600" : "text-green-600"
                } text-center md:text-left`}
              >
                {feedback}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              What does this mean?
            </h2>
            <p className="text-gray-600 leading-relaxed text-center md:text-left">
              {detailedInfo}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-center gap-2 min-w-max md:min-w-0">
              {test.scoring.scoreRanges?.map((range, index) => (
                <div
                  key={index}
                  className={`${range.color} p-3 rounded-lg text-white text-center flex-1`}
                >
                  <span className="text-sm md:text-base font-medium block">
                    {range.description}
                  </span>
                  <span className="text-xs opacity-90 block">
                    {range.range} points
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-6">
            <p
              className={`${
                test.isPremium ? "text-purple-600" : "text-blue-600"
              } font-semibold text-lg px-4`}
            >
              Don&apos;t face your challenges alone. Professional help is
              available!
            </p>
            <button
              className={`${
                test.isPremium
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
            >
              Find a Specialist
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

const TestResultPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      }
    >
      <ClientSideResult />
    </Suspense>
  );
};

export default TestResultPage;
