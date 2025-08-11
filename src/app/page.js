// app/page.js
'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   // Simple email validation
  //   if (!email || !email.includes('@')) {
  //     setError('Please enter a valid email address.');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await fetch('/api/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (res.ok) {
  //       // Save email to localStorage (optional)
  //       localStorage.setItem('studentEmail', email);
  //       // Redirect to game
  //       window.location.href = '/game';
  //     } else {
  //       const result = await res.json();
  //       setError(result.error || 'Login failed.');
  //     }
  //   } catch (err) {
  //     setError('Network error. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted!'); // 🔥 Debug

  setLoading(true);
  setError('');

  if (!email || !email.includes('@')) {
    setError('Please enter a valid email.');
    setLoading(false);
    return;
  }

  try {
    console.log('Sending fetch to /api/login...'); // 🔥
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    console.log('Response status:', res.status); // 🔥

    const data = await res.json();
    console.log('Response data:', data); // 🔥

    if (res.ok) {
       localStorage.setItem('studentEmail', email);
  window.location.href = '/quiz-menu';
    } else {
      setError(data.error || 'Login failed');
    }
  } catch (err) {
    console.error('Fetch error:', err); // 🔥
    setError('Network error. Check console.');
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'teal',
        color: 'white',
      }}
    >
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
          Student Login
        </h1>
        <p className="text-center mb-6">Enter your email to start the quiz</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@school.edu"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={loading}
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white font-medium rounded hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Logging in...' : 'Start Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
}