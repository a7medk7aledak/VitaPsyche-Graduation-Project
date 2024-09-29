"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { tests } from "@app/content/free tests/data";
import Navbar from "@components/common/Navbar";

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
  scoreRanges?: { range: string; description: string; color: string }[]; // إضافة اللون
  veryMildOCD?: { min: number; max: number };
  mildOCD?: { min: number; max: number };
  moderateOCD?: { min: number; max: number };
  severeOCD?: { min: number; max: number };
  extremeOCD?: { min: number; max: number };
}

interface Test {
  testTitle: string;
  testSlug: string;
  questions: Question[];
  scoring: TestScoring;
}

// دالة لحساب أعلى درجة ممكنة لكل اختبار بناءً على الأسئلة والخيارات
function calculateMaxScore(questions: Question[]): number {
  return questions.reduce((max, question) => {
    // إيجاد أعلى درجة لكل سؤال وجمعها مع بقية الأسئلة
    const maxOptionScore = Math.max(...question.options.map(opt => opt.score));
    return max + maxOptionScore;
  }, 0);
}

// دالة لحساب مكان المؤشر بناءً على الدرجة والحد الأقصى
function calculatePointerPosition(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  return `calc(${percentage}% - 20px)`; // "-20px" لتوسيط المؤشر بشكل صحيح
}

const ClientSideResult: React.FC = () => {
  const [test, setTest] = useState<Test | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [maxScore, setMaxScore] = useState(0); // إضافة حالة لحساب maxScore

  const searchParams = useSearchParams();
  const testSlug = searchParams?.get("testSlug");
  const answersStr = searchParams?.get("answers");

  useEffect(() => {
    if (testSlug) {
      const selectedTest = tests.find((t) => t.testSlug === testSlug);
      if (selectedTest) {
        setTest(selectedTest);
        setUserAnswers(JSON.parse(answersStr || "[]"));
      }
    }
  }, [testSlug, answersStr]);

  useEffect(() => {
    if (test && userAnswers.length > 0) {
      let totalScore = 0;

      test.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const option = question.options.find((opt) => opt.optionId === userAnswer);

        if (option && option.score !== undefined) {
          totalScore += option.score;
        }
      });

      setScore(totalScore);

      // حساب maxScore ديناميكيًا بناءً على الأسئلة
      const calculatedMaxScore = calculateMaxScore(test.questions);
      setMaxScore(calculatedMaxScore);

      // تعيين feedback بناءً على نوع الاختبار
      if (test.testTitle === "ADHD and Impulsivity Diagnosis Scale") {
        setFeedback(getADHDFeedback(totalScore, test.scoring.scoreRanges));
      } else if (test.testTitle === "Yale-Brown Obsessive Compulsive Scale (Y-BOCS)") {
        setFeedback(getYBOCSFeedback(totalScore, test.scoring.scoreRanges));
      }
       else if (test.testTitle === "Beck Depression Inventory") {
        setFeedback(getDEORETIONeedback(totalScore, test.scoring.scoreRanges));
      }
    }
  }, [test, userAnswers]);

  const getADHDFeedback = (score: number, scoreRanges?: { range: string; description: string }[]): string => {
    if (!scoreRanges) return "No feedback available.";
    for (const range of scoreRanges) {
      const [min, max] = range.range.split("-").map(Number);
      if (score >= min && score <= max) {
        return range.description;
      }
    }
    return "Score out of range.";
  };

  const getYBOCSFeedback = (score: number, scoreRanges?: { range: string; description: string }[]): string => {
    if (!Array.isArray(scoreRanges)) return "No feedback available."; // Check if scoreRanges is an array
    for (const range of scoreRanges) {
      const [min, max] = range.range.split("-").map(Number);
      if (score >= min && score <= max) {
        return range.description;
      }
    }
    return "Score out of range.";
  };


  const getDEORETIONeedback = (score: number, scoreRanges?: { range: string; description: string }[]): string => {
    if (!Array.isArray(scoreRanges)) return "No feedback available."; // Check if scoreRanges is an array
    for (const range of scoreRanges) {
      const [min, max] = range.range.split("-").map(Number);
      if (score >= min && score <= max) {
        return range.description;
      }
    }
    return "Score out of range.";
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex mt-20 flex-col items-center min-h-screen p-4">
        <div className="min-h-screen w-full flex flex-col bg-gray-100">
          {/* العنوان بخلفية خضراء */}
          <header className="w-full bg-green-700 py-6 mb">
            <h1 className="text-3xl font-bold text-center text-white">{test.testTitle}</h1>
          </header>

          {/* محتوى الصفحة */}
          <main className="flex-grow flex flex-col w-full -mt-32 items-center justify-center p-6">
            {/* النتيجة */}
            <div className="text-center mb-8">
              <span className="text-2xl font-semibold">Your result is</span>
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-5xl font-bold text-blue-600">{score}</span>
                <h3 className="text-2xl font-semibold text-gray-700 ml-2">{feedback}</h3>
              </div>
            </div>

            {/* مقياس التقييم */}
            <div className="relative w-full p-10 items-center">
              <div className="grid grid-cols-5 text-center mb-8 w-full">
                {test.scoring.scoreRanges?.map((range, index) => (
                  <div
                    key={index}
                    className={`py-2 px-2 text-white ${range.color} shadow-lg transition-transform transform`}
                  >
                    <span className="font-semibold block">{range.description}</span>
                  </div>
                ))}
              </div>

              {/* مؤشر النتيجة */}
              <div
                className="absolute -top-12 sm:-top-8 flex items-center justify-center"
                style={{ left: calculatePointerPosition(score, maxScore) }} // تمرير maxScore ديناميكيًا
              >
                {/* عرض النتيجة في المؤشر */}
                <div className="relative flex items-center justify-center bg-gray-200 text-blue-600 text-sm sm:text-lg font-semibold rounded-lg px-3 py-2">
                  {score}
                  <div className="absolute bottom-[-8px] left-[50%] transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-200"></div>
                </div>
              </div>
            </div>

            {/* تفسير النتيجة */}
            <div className="text-center mb-8 max-w-2xl">
              <h2 className="text-lg font-semibold mb-2">What does that mean?</h2>
              <p className="text-gray-700 mb-4">
                Your depression is severe. You experience symptoms of depression most of the time, and it disrupts your
                life to a great extent. You need professional help to overcome this depression that is affecting your
                life greatly.
              </p>
              <p className="text-gray-700">
                Please share the results with your therapist to be absolutely sure of the outcome.
              </p>
            </div>

            {/* رسالة الدعم */}
            <div className="text-center text-blue-600 font-semibold text-lg mb-6">
              You shouldn&apos;t try to cope with what you&apos;re going through alone. We&apos;re here to help!
            </div>

            {/* زر الدعوة للعمل */}
            <div className="text-center">
              <button className="bg-button hover:bg-heading transitions text-white py-3 px-6 rounded-lg">
                Choose your specialist doctor
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const TestResultPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ClientSideResult />
    </Suspense>
  );
};

export default TestResultPage;
