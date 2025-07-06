import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../services/api';

export default function RequestFormPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [timeline, setTimeline] = useState('');
  const mutation = useMutation({
  mutationKey: ['request', id],
  mutationFn: data => apiClient.post(`/request/${id}`, data),
  onSuccess: data => alert(data.message),
});

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ message, timeline });
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Request Referral</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Message</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Expected Timeline</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={timeline}
            onChange={e => setTimeline(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit Request
        </button>
      </form>
    </div>
);
}
