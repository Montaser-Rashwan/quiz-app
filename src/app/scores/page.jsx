// app/scores/page.js
'use client';

import { useEffect, useState } from 'react';
import { getScores } from '../../lib/utils';
import Button from '../../components/Button';

export default function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setScores(getScores());
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-10">
      <h1 className="text-7xl text-primary mb-8">Saved Scores</h1>
      <ul className="w-full max-w-md">
        {scores.length === 0 ? (
          <li className="text-xl text-gray-600">No scores yet!</li>
        ) : (
          scores.map((scoreObj, i) => (
            <li
              key={i}
              className="high-score text-3xl mb-4 p-2 hover:scale-105 transition-transform"
            >
              {scoreObj.name} - {scoreObj.score}
            </li>
          ))
        )}
      </ul>
      <Button href="/">Go Home</Button>
    </div>
  );
}