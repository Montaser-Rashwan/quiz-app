// app/game/page.js
'use client';

import { useEffect, useState } from 'react';
import { saveRecentScore } from '../../lib/utils';
import QuestionCard from '../../components/QuestionCard';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

const MAX_QUESTIONS = 1000;
const CORRECT_BONUS = 5;

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [availableQuestions, setAvailableQuestions] = useState([]);

  useEffect(() => {
    fetch('/questions.json')
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setAvailableQuestions(shuffled.slice(0, MAX_QUESTIONS));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load questions:', err);
        setLoading(false);
      });
  }, []);

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
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!questions.length) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl">Failed to load questions.</p>
        <Button href="/">Go Home</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* HUD */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow">
        <div className="text-center">
          <p className="text-sm text-gray-600">Question</p>
          <p className="text-xl font-semibold">
            {questionCounter} / {MAX_QUESTIONS}
          </p>
          <div className="w-80 bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
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