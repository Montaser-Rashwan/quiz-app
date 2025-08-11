// app/admin/page.js
'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-logins')
      .then(res => res.json())
      .then(data => setLogins(data.logins || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Student Login Stats</h1>
      <p className="text-xl mb-6">
        <strong>Total Unique Students:</strong> {logins.length}
      </p>

      <h2 className="text-2xl mb-4">List of Students:</h2>
      <ul className="space-y-2 max-w-lg">
        {logins.length === 0 ? (
          <li>No students have logged in yet.</li>
        ) : (
          logins.map((item, i) => (
            <li key={i} className="p-2 border-b border-gray-200">
              {item.email} — {new Date(item.firstLogin).toLocaleDateString()}
            </li>
          ))
        )}
      </ul>

      <div className="mt-8">
        <a href="/" className="text-teal-600 hover:underline">← Back to Login</a>
      </div>
    </div>
  );
}