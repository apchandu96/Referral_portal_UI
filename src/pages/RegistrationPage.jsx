import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../services/api';

export default function RegistrationPage() {
  const navigate = useNavigate();
 const mutation = useMutation({
  mutationKey: ['register'],
  mutationFn: data => apiClient.post('/register', data),
  onSuccess: () => navigate('/dashboard'),
});

  const [form, setForm] = useState({ name: '', email: '', password: '', linkedin: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {['name','email','password','linkedin'].map(field => (
          <div key={field} className="mb-4">
            <label className="block mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              name={field}
              className="w-full border rounded px-3 py-2"
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
);
}
