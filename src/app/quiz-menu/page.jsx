// app/quiz-menu/page.js
'use client';

import { useEffect, useState } from 'react';

export default function QuizMenu() {
  const [email, setEmail] = useState('');

  // Optional: Load saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem('studentEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
    
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'teal' }}>
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-teal-600">
          Welcome, Student!
        </h1>
        {email && <p className="text-sm text-gray-600 mb-6">Logged in as: {email}</p>}

        <h2 className="text-2xl mb-6">Choose Your Quiz</h2>

        <div className="space-y-4">
          <a
            href="/game/html"
            className="block py-4 bg-blue-600 text-white text-lg font-medium rounded hover:bg-blue-700 transition"
          >
            📘 HTML Quiz
          </a>

          <a
            href="/game/css"
            className="block py-4 bg-orange-600 text-white text-lg font-medium rounded hover:bg-orange-700 transition"
          >
            🎨 CSS Quiz
          </a>

          <a
            href="/game/javascript"
            className="block py-4 bg-yellow-600 text-white text-lg font-medium rounded hover:bg-yellow-700 transition"
          >
            ⚡ JavaScript Quiz
          </a>
        </div>

        <div className="mt-8">
          <a href="/" className="text-teal-600 hover:underline text-sm">
            ← Logout
          </a>
        </div>
      </div>
    </div>
  );
}