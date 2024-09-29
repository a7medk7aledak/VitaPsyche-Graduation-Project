"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { tests } from '@app/content/free tests/data'; 

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
  instruction?: string; // Now optional
  scoreRanges?: { range: string; description: string }[];
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

const TestResultPage = () => {
  const [test, setTest] = useState<Test | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const searchParams = useSearchParams();
  const testSlug = searchParams?.get('testSlug');
  const answersStr = searchParams?.get('answers');

  useEffect(() => {
    if (testSlug) {
      const selectedTest = tests.find((t) => t.testSlug === testSlug);
      if (selectedTest) {
        setTest(selectedTest);
        setUserAnswers(JSON.parse(answersStr || '[]'));
      }
    }
  }, [testSlug, answersStr]);

  useEffect(() => {
    if (test && userAnswers.length > 0) {
      let totalScore = 0;

      test.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const option = question.options?.find((opt) => opt.optionId === userAnswer);

        if (option && option.score !== undefined) {
          totalScore += option.score;
        }
      });

      setScore(totalScore);

      if (test.testTitle === 'ADHD and Impulsivity Diagnosis Scale') {
        setFeedback(getADHDFeedback(totalScore, test.scoring.scoreRanges));
      } else if (test.testTitle === 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS)') {
        setFeedback(getYBOCSFeedback(totalScore, test.scoring));
      }
    }
  }, [test, userAnswers]);

  const getADHDFeedback = (score: number, scoreRanges?: { range: string; description: string }[]) => {
    if (!scoreRanges) return 'No feedback available.';
    for (const range of scoreRanges) {
      const [min, max] = range.range.split('-').map(Number);
      if (score >= min && score <= max) {
        return range.description;
      }
    }
    return 'Score out of range.';
  };

  const getYBOCSFeedback = (score: number, scoring: TestScoring) => {
    if (scoring.veryMildOCD && score >= scoring.veryMildOCD.min && score <= scoring.veryMildOCD.max) {
      return 'Very mild OCD symptoms.';
    } else if (scoring.mildOCD && score >= scoring.mildOCD.min && score <= scoring.mildOCD.max) {
      return 'Mild OCD symptoms.';
    } else if (scoring.moderateOCD && score >= scoring.moderateOCD.min && score <= scoring.moderateOCD.max) {
      return 'Moderate OCD symptoms.';
    } else if (scoring.severeOCD && score >= scoring.severeOCD.min && score <= scoring.severeOCD.max) {
      return 'Severe OCD symptoms.';
    } else if (scoring.extremeOCD && score >= scoring.extremeOCD.min && score <= scoring.extremeOCD.max) {
      return 'Extreme OCD symptoms.';
    }
    return 'Score out of range.';
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{test.testTitle} Results</h1>
      <p>Your Total Score: {score}</p>
      <p>{feedback}</p>
    </div>
  );
};

export default TestResultPage;
