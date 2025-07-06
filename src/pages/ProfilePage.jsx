import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';

export default function ProfilePage() {
  const { data, isLoading, error } = useQuery({
  queryKey: ['profile'],
  queryFn: () => apiClient.get('/profile'),
});

  if (isLoading) return <div className="p-8">Loading...</div>;

 const user = data?.profile || {};

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Profile Complete:</strong> {user.profileComplete}%</p>
    </div>
);
}
