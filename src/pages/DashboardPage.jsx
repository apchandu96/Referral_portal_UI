import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
 const { data, isLoading, error } = useQuery({
  queryKey: ['dashboard'],
  queryFn: () => apiClient.get('/dashboard'),
});
  if (isLoading) return <div className="p-8">Loading...</div>;

const items = data?.referrals ?? [];
console.log('Dashboard items:', items);
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {items.length === 0 ? (
        <p>No referrals yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(r => (
            <li key={r.id}>
              <Link to={`/referrer/${r.id}`} className="text-blue-600 hover:underline">
                {r.title}
              </Link> - <span>{r.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
);
}
