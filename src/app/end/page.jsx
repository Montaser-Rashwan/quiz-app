// app/end/page.js
'use client';

import { useEffect, useState } from 'react';
import { getRecentScore, saveScores } from '../../lib/utils';
import Button from '../../components/Button';

export default function End() {
  const [score, setScore] = useState('');
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const recent = getRecentScore();
    setScore(recent);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newScore = { name, score: Number(score) };
    const prevScores = JSON.parse(localStorage.getItem('scores') || '[]');
    const updated = [...prevScores, newScore];
    saveScores(updated);

    setSaved(true);
  };

  if (saved) {
    return (
      <div className="text-center py-10">
        <h1 className="text-5xl text-green-600 mb-6">Score Saved!</h1>
        <Button href="/scores">View Scores</Button>
        <Button href="/game">Play Again</Button>
        <Button href="/">Go Home</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center py-10">
      <h1 className="text-5xl text-primary mb-6">Your Score: {score}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 mb-4 text-lg border-none rounded shadow focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <Button type="submit" disabled={!name.trim()}>
          Save
        </Button>
      </form>
      <Button href="/game">Play Again</Button>
      <Button href="/">Go Home</Button>
    </div>
  );
}