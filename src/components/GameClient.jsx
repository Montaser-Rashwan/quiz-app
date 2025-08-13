// app/components/GameClient.jsx
'use client';

import { useEffect, useState } from 'react';

export default function GameClient() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [availableQuestions, setAvailableQuestions] = useState([]);

  const MAX_QUESTIONS = 200;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch('/questions-html.json');
        if (!res.ok) throw new Error('فشل تحميل الأسئلة');
        const data = await res.json();

        if (data.length === 0) {
          console.error('لا توجد أسئلة');
          return;
        }

        // خلط عشوائي
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setAvailableQuestions(shuffled.slice(0, MAX_QUESTIONS));
      } catch (err) {
        console.error('خطأ في تحميل الأسئلة:', err);
      }
    };

    if (questions.length === 0) {
      loadQuestions();
    }
  }, [questions.length]);

  // بدء السؤال التالي
  useEffect(() => {
    if (availableQuestions.length > 0 && !currentQuestion && questionCounter < MAX_QUESTIONS) {
      const next = availableQuestions[0];
      setCurrentQuestion(next);
      setAvailableQuestions(prev => prev.slice(1));
      setQuestionCounter(prev => prev + 1);
    } else if (questionCounter >= MAX_QUESTIONS || availableQuestions.length === 0) {
      // الانتهاء
      localStorage.setItem('mostRecentScore', score);
      window.location.href = '/end';
    }
  }, [availableQuestions, currentQuestion, questionCounter, score, MAX_QUESTIONS]);

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) {
      setScore(prev => prev + 5);
    }

    setTimeout(() => {
      setCurrentQuestion(null);
    }, 1000);
  };

  if (!currentQuestion) {
    return <div>جاري تحميل السؤال التالي...</div>;
  }

  return (
    <div className="container">
      <div id="hud">
        <div id="hud-item">
          <p id="progressText">سؤال {questionCounter} / {MAX_QUESTIONS}</p>
          <div id="progressBar">
            <div
              id="progressBarFull"
              style={{ width: `${(questionCounter / MAX_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>
        <div id="hud-item">
          <p className="hud-prefix">الدرجة</p>
          <h1 className="hud-main-text" id="score">{score}</h1>
        </div>
      </div>

      <h2 id="question">{currentQuestion.question}</h2>

      {[1, 2, 3, 4].map(num => (
        <div
          key={num}
          className="choice-container"
          onClick={() => handleAnswer(num)}
        >
          <p className="choice-prefix">{String.fromCharCode(64 + num)}</p>
          <p className="choice-text">{currentQuestion[`choice${num}`]}</p>
        </div>
      ))}
    </div>
  );
}