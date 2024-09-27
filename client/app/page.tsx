'use client';

import { useState } from 'react';

export default function Home() {
  const [feedback, setFeedback] = useState('');
  const [result, setResult] = useState<{
    sentiment: string;
    score: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('http://localhost:8080/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback }),
    });

    const data = await res.json();
    setResult(data);
    console.log(result?.sentiment);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="p-6 bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <textarea
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Enter your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit Feedback
          </button>
        </form>
        {loading && <p>Analyzing...</p>}
        {result && (
          <div className="mt-4">
            <p>
              Sentiment:{' '}
              <span
                className={
                  result.sentiment === 'Positive'
                    ? 'text-green-500'
                    : result.sentiment === 'Negative'
                    ? 'text-red-500'
                    : 'text-black'
                }
              >
                {result?.sentiment}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
