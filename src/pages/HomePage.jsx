// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useQuery }      from '@tanstack/react-query';
import { apiClient }     from '../services/api';
import { Link }          from 'react-router-dom';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submitted, setSubmitted]   = useState('');

  // Fetch from `/home` endpoint; include query param only when submitted
  const { data, isLoading, error } = useQuery({
    queryKey: ['home', submitted],
    queryFn: () => {
      const path = submitted
        ? `/home?query=${encodeURIComponent(submitted)}`
        : '/home';
      return apiClient.get(path);
    },
    // Only refetch when `submitted` changes
    keepPreviousData: true,
  });

  const referrals = data?.referrals || [];

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(searchTerm.trim());
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Referrals</h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex mb-8">
        <input
          type="text"
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
          placeholder="Search by company, role, name…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Loading / Error */}
      {isLoading && <p className="text-center">Loading…</p>}
      {error     && <p className="text-center text-red-500">Error loading referrals.</p>}

      {/* Empty State */}
      {!isLoading && referrals.length === 0 && (
        <p className="text-center text-gray-500">
          {submitted
            ? `No results for “${submitted}”`
            : 'No referrals available at the moment.'}
        </p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {referrals.map(r => (
          <Link
            key={r.id}
            to={`/referrer/${r.id}`}
            className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {r.imageUrl && (
              <img
                src={r.imageUrl}
                alt={r.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{r.title}</h3>
              <p className="text-sm text-gray-600">{r.company}</p>
              {r.snippet && <p className="mt-2 text-gray-700">{r.snippet}</p>}
              {r.successRate != null && (
                <p className="mt-3 text-sm text-gray-500">
                  Success Rate: {r.successRate}%
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
