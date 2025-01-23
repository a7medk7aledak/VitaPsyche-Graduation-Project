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
function calculatePersonalityDisorders(
  answers: number[],
  questions: Question[]
): {
  disorders: string[];
  details: string;
} {
  const disorderRanges = [
    {
      name: "Paranoid Personality",
      range: [1, 2, 3, 4, 5, 6, 7, 8],
      threshold: 4,
    },
    {
      name: "Schizoid Personality",
      range: [9, 10, 11, 12, 13, 14, 15, 16],
      threshold: 4,
    },
    {
      name: "Schizotypal Personality",
      range: [17, 18, 19, 20, 21, 22, 23, 24],
      threshold: 5,
    },
    {
      name: "Antisocial Personality",
      range: [25, 26, 27, 28, 29, 30, 31, 32],
      threshold: 3,
    },
    {
      name: "Borderline Personality",
      range: [33, 34, 35, 36, 37, 38, 39, 40],
      threshold: 5,
    },
    {
      name: "Histrionic Personality",
      range: [41, 42, 43, 44, 45, 46, 47, 48],
      threshold: 5,
    },
    {
      name: "Narcissistic Personality",
      range: [49, 50, 51, 52, 52, 53, 54, 55, 56],
      threshold: 5,
    },
    {
      name: "Obsessive-Compulsive Personality",
      range: [57, 58, 59, 60, 61, 62, 63, 64],
      threshold: 4,
    },
    {
      name: "Dependent Personality",
      range: [65, 66, 67, 68, 69, 70, 71, 72],
      threshold: 4,
    },
    {
      name: "Multiple Dependent Personality",
      range: [73, 74, 78, 79, 79, 80],
      threshold: 4,
    },
    {
      name: "Passive-Aggressive Personality",
      range: [81, 82, 83, 84, 85, 86, 87, 88],
      threshold: 4,
    },
    {
      name: "Depressive Personality",
      range: [89, 90, 91, 92, 93, 94, 95, 96],
      threshold: 5,
    },
    {
      name: "Self-Defeating Personality",
      range: [97, 98, 99, 100, 101, 102, 103, 104],
      threshold: 5,
    },
    {
      name: "Sadistic Personality",
      range: [105, 106, 107, 108, 109, 110, 111, 112],
      threshold: 4,
    },
    {
      name: "Masochistic Personality",
      range: [113, 114, 115, 116, 117, 118, 119, 120],
      threshold: 4,
    },
  ];

  const results = disorderRanges.map((disorder) => {
    const score = disorder.range.reduce((count, qIndex) => {
      const answer = answers[qIndex - 1];
      const option = questions[qIndex - 1]?.options.find(
        (opt) => opt.optionId === answer
      );
      return count + ((option?.score ?? 0) >= 1 ? 1 : 0);
    }, 0);

    return {
      name: disorder.name,
      score: score,
      hasDisorder: score >= disorder.threshold,
      threshold: disorder.threshold,
    };
  });

  const detectedDisorders = results
    .filter((r) => r.hasDisorder)
    .map((r) => r.name);
  const details = results
    .map(
      (r) =>
        `${r.name}: ${r.score}/${r.threshold} (${
          r.hasDisorder ? "Present" : "Not Present"
        })`
    )
    .filter(Boolean)
    .join("\n");

  return {
    disorders: detectedDisorders,
    details: details || "No results available",
  };
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
      } else if (test.testSlug === "personality-disorders-test") {
        const result = calculatePersonalityDisorders(
          userAnswers,
          test.questions
        );

        if (result.disorders.length > 0) {
          setFeedback(
            `Potential indicators found for: ${result.disorders.join(", ")}`
          );
        } else {
          setFeedback("No significant personality disorder indicators found");
        }

        setDetailedInfo(result.details);
        setScore(result.disorders.length);
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

  const renderPersonalityDisorderResults = () => {
    if (!detailedInfo) {
      return (
        <div className="text-center text-gray-600">
          No detailed information available
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {detailedInfo.split("\n").map((line, index) => {
          if (!line) return null;

          const parts = line.split(":");
          if (parts.length < 2) return null;

          const name = parts[0];
          const scoreInfo = parts[1];
          const isPresent = scoreInfo?.includes("Present") || false;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                isPresent
                  ? "border-red-200 bg-red-50"
                  : "border-green-200 bg-green-50"
              }`}
            >
              <h3 className="font-semibold text-gray-800">{name}</h3>
              <p
                className={`text-sm mt-1 ${
                  isPresent ? "text-red-600" : "text-green-600"
                }`}
              >
                {scoreInfo}
              </p>
            </div>
          );
        })}
      </div>
    );
  };
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
          {test.testSlug === "personality-disorders-test" ? (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-700 mb-6">
                  Test Results Summary
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-lg text-center text-gray-700">
                    {feedback}
                  </p>
                </div>
                {renderPersonalityDisorderResults()}
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Understanding Your Results
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Important Note
                    </h3>
                    <p className="text-blue-600 text-sm">
                      This screening tool provides initial insights but is not a
                      diagnostic instrument. A proper diagnosis can only be made
                      by a qualified mental health professional.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Score Interpretation
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                      <li>
                        &ldquo;Present&rdquo; indicates that responses meet the
                        threshold for further evaluation
                      </li>
                      <li>
                        &ldquo;Not Present&rdquo; suggests symptoms may not be
                        clinically significant
                      </li>
                      <li>
                        Multiple indicators may suggest overlapping traits or
                        complex presentations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Next Steps
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-2">
                      Professional Consultation
                    </h3>
                    <p className="text-purple-600 text-sm">
                      If your results indicate any concerns, consider scheduling
                      an appointment with a mental health professional for a
                      comprehensive evaluation.
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">
                      Self-Care Steps
                    </h3>
                    <p className="text-green-600 text-sm">
                      Regardless of your results, maintaining good mental health
                      through regular self-care, stress management, and healthy
                      relationships is important.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
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
                      {score}
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

              {test.scoring.scoreRanges && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-x-auto">
                  <div className="flex flex-col md:flex-row justify-center gap-2 min-w-max md:min-w-0">
                    {test.scoring.scoreRanges.map((range, index) => (
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
              )}
            </>
          )}

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
