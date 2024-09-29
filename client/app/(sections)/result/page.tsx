"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { tests } from '@app/content/free tests/data'; 

const TestResultPage = () => {
  const [test, setTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const searchParams = useSearchParams();
  const testSlug = searchParams.get('testSlug'); 
  const answersStr = searchParams.get('answers'); 

  useEffect(() => {
    const selectedTest = tests.find((t) => t.testSlug === testSlug);
    if (selectedTest) {
      setTest(selectedTest);
      setUserAnswers(JSON.parse(answersStr || '[]')); // Parse answers from URL
    }
  }, [testSlug, answersStr]);

  useEffect(() => {
    if (test && userAnswers.length > 0) {
      let totalScore = 0;

      // حساب النتيجة بناءً على كل سؤال وإجابة المستخدم
      test.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const option = question.options?.find((opt) => opt.optionId === userAnswer);

        if (option && option.score !== undefined) {
          totalScore += option.score;
        }
      });

      setScore(totalScore);

      // التصحيح بناءً على نوع الاختبار
      if (test.testTitle === 'ADHD and Impulsivity Diagnosis Scale') {
        setFeedback(getADHDFeedback(totalScore, test.scoring.scoreRanges));
      } else if (test.testTitle === 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS)') {
        setFeedback(getYBOCSFeedback(totalScore, test.scoring));
      }
    }
  }, [test, userAnswers]);

  const getADHDFeedback = (score, scoreRanges) => {
    for (let range of scoreRanges) {
      const [min, max] = range.range.split('-').map(Number);
      if (score >= min && score <= max) {
        return range.description;
      }
    }
    return 'Score out of range.';
  };

  const getYBOCSFeedback = (score, scoring) => {
    if (score >= scoring.veryMildOCD.min && score <= scoring.veryMildOCD.max) {
      return 'Very mild OCD symptoms.';
    } else if (score >= scoring.mildOCD.min && score <= scoring.mildOCD.max) {
      return 'Mild OCD symptoms.';
    } else if (score >= scoring.moderateOCD.min && score <= scoring.moderateOCD.max) {
      return 'Moderate OCD symptoms.';
    } else if (score >= scoring.severeOCD.min && score <= scoring.severeOCD.max) {
      return 'Severe OCD symptoms.';
    } else if (score >= scoring.extremeOCD.min && score <= scoring.extremeOCD.max) {
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
