import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';

export default function ReferrerDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
  queryKey: ['referrer', id],
  queryFn: () => apiClient.get(`/referrer/${id}`),
});

  if (isLoading) return <div className="p-8">Loading...</div>;

const ref = data || {};

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">{ref.name}</h2>
      <p><strong>Company:</strong> {ref.company}</p>
      <p><strong>Title:</strong> {ref.title}</p>
      <p><strong>Experience:</strong> {ref.experience} years</p>
      <p><strong>Success Rate:</strong> {ref.successRate}%</p>
      <Link to={`/request/${ref.id}`} className="text-blue-600 hover:underline">Request Referral</Link>
    </div>
);
}
