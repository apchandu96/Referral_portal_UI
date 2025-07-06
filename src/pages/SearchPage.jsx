import React, { useState } from 'react';
import { apiClient } from '../services/api';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await apiClient.get(`/search?query=${encodeURIComponent(query)}`);
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Referrers</h2>
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Company, role, name..."
        />
        <button type="submit" className="ml-2 bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      <ul className="space-y-2">
        {results.map(r => (
          <li key={r.id}>
            <Link to={`/referrer/${r.id}`} className="text-blue-600 hover:underline">
              {r.name} - {r.title} at {r.company}
            </Link>
          </li>
        ))}
      </ul>
    </div>
);
}
