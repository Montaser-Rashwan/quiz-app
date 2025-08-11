// app/game/[type]/page.js
'use client';

import { useEffect, useState } from 'react';
import { saveRecentScore } from '../../../lib/utils';
import QuestionCard from '../../../components/QuestionCard';
import Loader from '../../../components/Loader';

const MAX_QUESTIONS = 200; // Reduced for demo
const CORRECT_BONUS = 5;

export default function Game({ params }) {
  const { type } = params; // Get quiz type from URL
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [availableQuestions, setAvailableQuestions] = useState([]);

  // Map quiz type to JSON file
  const quizFiles = {
    html: '/questions-html.json',
    css: '/questions-css.json',
    javascript: '/questions-js.json',
  };

  const fileName = quizFiles[type] || '/questions-html.json';

  useEffect(() => {
    fetch(fileName)
      .then((res) => {
        if (!res.ok) throw new Error(`File not found: ${fileName}`);
        return res.json();
      })
      .then((data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setAvailableQuestions(shuffled.slice(0, MAX_QUESTIONS));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load quiz:', err);
        alert(`Quiz not available: ${type.toUpperCase()}`);
        window.location.href = '/quiz-menu';
      });
  }, [type, fileName]);

  useEffect(() => {
    if (availableQuestions.length > 0 && !currentQuestion && questionCounter < MAX_QUESTIONS) {
      const next = availableQuestions[questionCounter];
      setCurrentQuestion(next);
    }
  }, [availableQuestions, currentQuestion, questionCounter]);

  const handleAnswer = (correct) => {
    if (correct) {
      setScore((prev) => prev + CORRECT_BONUS);
    }

    const nextCounter = questionCounter + 1;
    setQuestionCounter(nextCounter);
    setCurrentQuestion(null);

    if (nextCounter >= MAX_QUESTIONS) {
      saveRecentScore(score + (correct ? CORRECT_BONUS : 0));
      window.location.href = '/end';
    } else {
      // Load next question
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {/* HUD */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow">
        <div className="text-center">
          <p className="text-sm text-gray-600">Quiz</p>
          <p className="text-xl font-semibold capitalize">{type}</p>
          <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(questionCounter / MAX_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Score</p>
          <h1 className="text-3xl font-bold">{score}</h1>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          choices={[
            currentQuestion.choice1,
            currentQuestion.choice2,
            currentQuestion.choice3,
            currentQuestion.choice4,
          ]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}